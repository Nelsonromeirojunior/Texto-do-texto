class VoiceToTextApp {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.finalTranscript = "";
        this.history = JSON.parse(
            localStorage.getItem("voiceToTextHistory") || "[]"
        );

        this.initializeElements();
        this.initializeSpeechRecognition();
        this.setupEventListeners();
        this.loadHistory();
        this.createParticles();
        this.updateWordCount();
        this.initializeTheme();
    }

    initializeElements() {
        this.microphoneBtn = document.getElementById("microphoneBtn");
        this.statusIndicator = document.getElementById("statusIndicator");
        this.textOutput = document.getElementById("textOutput");
        this.languageSelect = document.getElementById("languageSelect");
        this.confidenceBar = document.getElementById("confidenceBar");
        this.wordCount = document.getElementById("wordCount");
        this.charCount = document.getElementById("charCount");
        this.saveBtn = document.getElementById("saveBtn");
        this.copyBtn = document.getElementById("copyBtn");
        this.clearBtn = document.getElementById("clearBtn");
        this.downloadBtn = document.getElementById("downloadBtn");
        this.historyContainer = document.getElementById("historyContainer");
        this.clearHistoryBtn = document.getElementById("clearHistoryBtn");
        this.themeToggle = document.getElementById("themeToggle");
    }

    initializeSpeechRecognition() {
        if (
            !("webkitSpeechRecognition" in window) &&
            !("SpeechRecognition" in window)
        ) {
            this.showToast(
                "Erro: Reconhecimento de fala não suportado neste navegador.",
                "error"
            );
            this.microphoneBtn.classList.add("disabled");
            return;
        }

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();

        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = this.languageSelect.value;

        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateUI("listening");
            this.showToast("Escutando... Fale agora!", "success");
        };

        this.recognition.onresult = (event) => {
            let interimTranscript = "";
            let confidence = 0;

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                confidence = event.results[i][0].confidence || 0.5;

                if (event.results[i].isFinal) {
                    this.finalTranscript += transcript + " ";
                } else {
                    interimTranscript += transcript;
                }
            }

            this.textOutput.value = this.finalTranscript + interimTranscript;
            this.updateConfidence(confidence);
            this.updateWordCount();
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.updateUI("idle");

            if (this.finalTranscript.trim()) {
                this.addToHistory(this.finalTranscript.trim());
                this.showToast("Transcrição concluída!", "success");
            }
        };

        this.recognition.onerror = (event) => {
            this.isListening = false;
            this.updateUI("error");
            this.showToast(
                `Erro: ${this.getErrorMessage(event.error)}`,
                "error"
            );
        };
    }

    initializeTheme() {
        // Verifica a preferência do sistema
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        if (prefersDark && !localStorage.getItem("theme")) {
            document.body.classList.add("dark-theme");
            this.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }

        // Listener para mudanças na preferência do sistema
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", (e) => {
                if (!localStorage.getItem("theme")) {
                    document.body.classList.toggle("dark-theme", e.matches);
                    this.themeToggle.innerHTML = e.matches
                        ? '<i class="fas fa-moon"></i>'
                        : '<i class="fas fa-sun"></i>';
                }
            });

        // Listener para o botão de alternância
        this.themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
            const isDark = document.body.classList.contains("dark-theme");
            this.themeToggle.innerHTML = isDark
                ? '<i class="fas fa-moon"></i>'
                : '<i class="fas fa-sun"></i>';
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });

        // Carrega tema salvo, se existir
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            document.body.classList.toggle("dark-theme", savedTheme === "dark");
            this.themeToggle.innerHTML =
                savedTheme === "dark"
                    ? '<i class="fas fa-moon"></i>'
                    : '<i class="fas fa-sun"></i>';
        }
    }

    setupEventListeners() {
        this.microphoneBtn.addEventListener("click", () =>
            this.toggleRecognition()
        );

        this.languageSelect.addEventListener("change", () => {
            if (this.recognition) {
                this.recognition.lang = this.languageSelect.value;
            }
        });

        this.textOutput.addEventListener("input", () =>
            this.updateWordCount()
        );

        this.saveBtn.addEventListener("click", () => this.saveText());
        this.copyBtn.addEventListener("click", () => this.copyText());
        this.clearBtn.addEventListener("click", () => this.clearText());
        this.downloadBtn.addEventListener("click", () => this.downloadText());
        this.clearHistoryBtn.addEventListener("click", () =>
            this.clearHistory()
        );

        // Keyboard shortcuts
        document.addEventListener("keydown", (event) => {
            if (event.ctrlKey || event.metaKey) {
                switch (event.key) {
                    case "s":
                        event.preventDefault();
                        this.saveText();
                        break;
                    case "c":
                        if (event.shiftKey) {
                            event.preventDefault();
                            this.copyText();
                        }
                        break;
                    case " ":
                        if (event.shiftKey) {
                            event.preventDefault();
                            this.toggleRecognition();
                        }
                        break;
                }
            }
        });
    }

    toggleRecognition() {
        if (
            !this.recognition ||
            this.microphoneBtn.classList.contains("disabled")
        ) {
            return;
        }

        if (this.isListening) {
            this.recognition.stop();
        } else {
            this.finalTranscript = this.textOutput.value;
            this.recognition.start();
        }
    }

    updateUI(state) {
        switch (state) {
            case "listening":
                this.microphoneBtn.className = "microphone-btn listening";
                this.microphoneBtn.innerHTML = '<i class="fas fa-stop"></i>';
                this.statusIndicator.className =
                    "status-indicator status-listening";
                this.statusIndicator.innerHTML =
                    '<i class="fas fa-microphone"></i> Escutando... (Clique para parar)';
                break;
            case "idle":
                this.microphoneBtn.className = "microphone-btn idle";
                this.microphoneBtn.innerHTML =
                    '<i class="fas fa-microphone"></i>';
                this.statusIndicator.className = "status-indicator status-idle";
                this.statusIndicator.innerHTML =
                    '<i class="fas fa-microphone-slash"></i> Clique no microfone para começar';
                break;
            case "error":
                this.microphoneBtn.className = "microphone-btn idle";
                this.microphoneBtn.innerHTML =
                    '<i class="fas fa-microphone"></i>';
                this.statusIndicator.className = "status-indicator status-error";
                this.statusIndicator.innerHTML =
                    '<i class="fas fa-exclamation-triangle"></i> Erro no reconhecimento';
                break;
        }
    }

    updateConfidence(confidence) {
        const percentage = Math.round(confidence * 100);
        this.confidenceBar.style.width = `${percentage}%`;
    }

    updateWordCount() {
        const text = this.textOutput.value.trim();
        const words = text ? text.split(/\s+/).length : 0;
        const chars = text.length;

        this.wordCount.textContent = words;
        this.charCount.textContent = chars;
    }

    addToHistory(text) {
        const historyItem = {
            id: Date.now(),
            text: text,
            timestamp: new Date().toLocaleString("pt-BR"),
            language:
                this.languageSelect.options[this.languageSelect.selectedIndex]
                    .text,
        };

        this.history.unshift(historyItem);
        this.history = this.history.slice(0, 10); // Keep only last 10 items

        localStorage.setItem(
            "voiceToTextHistory",
            JSON.stringify(this.history)
        );
        this.loadHistory();
    }

    loadHistory() {
        if (this.history.length === 0) {
            this.historyContainer.innerHTML =
                '<p class="text-muted text-center">Nenhum histórico ainda. Comece a falar!</p>';
            return;
        }

        this.historyContainer.innerHTML = this.history
            .map(
                (item) => `
                    <div class="history-item">
                        <div class="history-timestamp">${item.timestamp} • ${item.language}</div>
                        <div class="history-text">${item.text}</div>
                        <button class="btn btn-sm btn-outline-primary mt-2" onclick="app.loadHistoryItem('${item.id}')">
                            <i class="fas fa-redo"></i> Carregar
                        </button>
                    </div>
                `
            )
            .join("");
    }

    loadHistoryItem(id) {
        const item = this.history.find((h) => h.id == id);
        if (item) {
            this.textOutput.value = item.text;
            this.finalTranscript = item.text;
            this.updateWordCount();
            this.showToast("Texto carregado do histórico!", "success");
        }
    }

    clearHistory() {
        this.history = [];
        localStorage.removeItem("voiceToTextHistory");
        this.loadHistory();
        this.showToast("Histórico limpo!", "success");
    }

    saveText() {
        if (!this.textOutput.value.trim()) {
            this.showToast("Nenhum texto para salvar!", "warning");
            return;
        }

        const savedTexts = JSON.parse(
            localStorage.getItem("savedTexts") || "[]"
        );
        const textItem = {
            id: Date.now(),
            text: this.textOutput.value.trim(),
            timestamp: new Date().toLocaleString("pt-BR"),
        };

        savedTexts.unshift(textItem);
        localStorage.setItem("savedTexts", JSON.stringify(savedTexts));
        this.showToast("Texto salvo com sucesso!", "success");
    }

    copyText() {
        if (!this.textOutput.value.trim()) {
            this.showToast("Nenhum texto para copiar!", "warning");
            return;
        }

        navigator.clipboard
            .writeText(this.textOutput.value)
            .then(() => {
                this.showToast(
                    "Texto copiado para a área de transferência!",
                    "success"
                );
            })
            .catch(() => {
                this.showToast("Erro ao copiar texto!", "error");
            });
    }

    clearText() {
        this.textOutput.value = "";
        this.finalTranscript = "";
        this.updateWordCount();
        this.updateConfidence(0);
        this.showToast("Texto limpo!", "info");
    }

    downloadText() {
        if (!this.textOutput.value.trim()) {
            this.showToast("Nenhum texto para download!", "warning");
            return;
        }

        const blob = new Blob([this.textOutput.value], {
            type: "text/plain",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `transcricao_${new Date()
            .toISOString()
            .slice(0, 10)}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        this.showToast("Download iniciado!", "success");
    }

    createParticles() {
        const particlesContainer = document.getElementById("particles");
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.style.left = Math.random() * 100 + "%";
            particle.style.animationDelay = Math.random() * 6 + "s";
            particle.style.animationDuration = Math.random() * 3 + 3 + "s";
            particlesContainer.appendChild(particle);
        }
    }

    getErrorMessage(error) {
        const errorMessages = {
            "no-speech": "Nenhuma fala detectada. Tente novamente.",
            "audio-capture": "Erro ao capturar áudio. Verifique o microfone.",
            "not-allowed": "Permissão de microfone negada.",
            network: "Erro de rede. Verifique sua conexão.",
            "language-not-supported": "Idioma não suportado.",
            "service-not-allowed": "Serviço não permitido.",
        };
        return errorMessages[error] || "Erro desconhecido";
    }

    showToast(message, type = "info") {
        const toastContainer = document.querySelector(".toast-container");
        const toastId = "toast_" + Date.now();

        const bgClass =
            {
                success: "bg-success",
                error: "bg-danger",
                warning: "bg-warning",
                info: "bg-info",
            }[type] || "bg-info";

        const toastHtml = `
                    <div id="${toastId}" class="toast align-items-center text-white ${bgClass} border-0" role="alert">
                        <div class="d-flex">
                            <div class="toast-body">
                                <i class="fas fa-${type === "success"
                ? "check"
                : type === "error"
                    ? "times"
                    : type === "warning"
                        ? "exclamation"
                        : "info"
            }"></i>
                                ${message}
                            </div>
                            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                        </div>
                    </div>
                `;

        toastContainer.insertAdjacentHTML("beforeend", toastHtml);
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement, { delay: 4000 });
        toast.show();

        toastElement.addEventListener("hidden.bs.toast", () => {
            toastElement.remove();
        });
    }
}

// Initialize the application
let app;
document.addEventListener("DOMContentLoaded", () => {
    app = new VoiceToTextApp();
});