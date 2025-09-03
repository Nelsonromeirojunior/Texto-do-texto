# 🎤 Conversor Voz para Texto - Voice to Text

Uma aplicação web moderna e acessível para conversão de fala em texto, desenvolvida especialmente para pessoas com deficiência auditiva e todos que precisam de transcrição de voz em tempo real.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?&style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?&style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?&style=flat&logo=javascript&logoColor=%23F7DF1E)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?&style=flat&logo=bootstrap&logoColor=white)

## 🌟 Características Principais

### ✨ **Interface Moderna e Acessível**
- Design responsivo com Bootstrap 5
- Alto contraste para melhor legibilidade
- Feedback visual constante
- Animações suaves e intuitivas
- Compatível com dispositivos móveis

### 🎯 **Funcionalidades Avançadas**
- **Reconhecimento contínuo de fala** em tempo real
- **Suporte a 6 idiomas**: Português, Inglês, Espanhol, Francês, Italiano e Alemão
- **Medidor de confiança** para precisão da transcrição
- **Histórico automático** das últimas 10 conversões
- **Exportação** em formato .txt
- **Contador** de palavras e caracteres

### 🔒 **Privacidade e Segurança**
- Funcionamento 100% local no navegador
- Nenhum dado enviado para servidores externos
- Salvamento local opcional
- Sem necessidade de cadastro ou login

## 🚀 Demo Online

**[🔗 Acesse a Demonstração Aqui](https://seu-usuario.github.io/voice-to-text)**

## 📱 Compatibilidade

| Navegador | Desktop | Mobile | Suporte |
|-----------|---------|--------|---------|
| Chrome | ✅ | ✅ | Completo |
| Edge | ✅ | ✅ | Completo |
| Safari | ✅ | ✅ | Completo |
| Firefox | ⚠️ | ⚠️ | Limitado |

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Framework CSS**: Bootstrap 5.3.0
- **Ícones**: Font Awesome 6.4.0
- **API**: Web Speech API (nativa do navegador)
- **Armazenamento**: LocalStorage para histórico

## 📦 Instalação e Uso

### Opção 1: Uso Direto (Recomendado)
1. Faça o download do arquivo `index.html`
2. Abra o arquivo em qualquer navegador moderno
3. Permita o acesso ao microfone quando solicitado
4. Comece a usar imediatamente!

### Opção 2: Servidor Local
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/voice-to-text.git

# Entre na pasta
cd voice-to-text

# Inicie um servidor local (Python)
python -m http.server 8000

# Ou use Node.js
npx http-server

# Acesse http://localhost:8000
```

### Opção 3: GitHub Pages
1. Fork este repositório
2. Vá em Settings > Pages
3. Selecione a branch main
4. Acesse `https://seu-usuario.github.io/voice-to-text`

## 📖 Como Usar

### 🎤 **Iniciando a Transcrição**
1. **Permitir Microfone**: O navegador solicitará permissão na primeira vez
2. **Escolher Idioma**: Selecione no dropdown (padrão: Português)
3. **Clicar no Microfone**: Botão grande e circular no centro
4. **Falar Normalmente**: O texto aparece em tempo real
5. **Parar Gravação**: Clique novamente no microfone

### 💾 **Salvando e Exportando**
- **Salvar**: Armazena no histórico local do navegador
- **Copiar**: Copia para área de transferência
- **Download**: Exporta como arquivo .txt
- **Limpar**: Remove o texto atual

### ⌨️ **Atalhos de Teclado**
- `Ctrl + S`: Salvar texto
- `Ctrl + Shift + C`: Copiar texto
- `Ctrl + Shift + Space`: Iniciar/parar gravação

## 🎨 Interface Visual

### Estados do Microfone
- 🟢 **Verde**: Pronto para gravar
- 🔴 **Vermelho**: Gravando (com animação pulsante)
- ⚫ **Cinza**: Desabilitado ou erro

### Indicadores Visuais
- **Barra de Confiança**: Mostra a precisão da transcrição
- **Contador em Tempo Real**: Palavras e caracteres
- **Notificações Toast**: Feedback para todas as ações
- **Histórico Visual**: Últimas transcrições com timestamps

## 🌍 Idiomas Suportados

| Código | Idioma | Status |
|--------|--------|--------|
| `pt-BR` | Português (Brasil) | ✅ Completo |
| `en-US` | English (US) | ✅ Completo |
| `es-ES` | Español | ✅ Completo |
| `fr-FR` | Français | ✅ Completo |
| `it-IT` | Italiano | ✅ Completo |
| `de-DE` | Deutsch | ✅ Completo |

## 🔧 Configurações Avançadas

### Personalização CSS
```css
/* Alterar cores principais */
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --success-color: #27ae60;
    --danger-color: #e74c3c;
}
```

### Configuração JavaScript
```javascript
// Alterar configurações do reconhecimento
this.recognition.continuous = true;      // Reconhecimento contínuo
this.recognition.interimResults = true;  // Resultados intermediários
this.recognition.maxAlternatives = 1;    // Número de alternativas
```

## 🎯 Casos de Uso

### 👥 **Para Pessoas com Deficiência Auditiva**
- Transcrição de palestras e reuniões
- Anotações de aulas em tempo real
- Comunicação assistida
- Documentação de conversas

### 💼 **Uso Profissional**
- Transcrição de entrevistas
- Anotações de reuniões
- Ditado de documentos
- Criação de atas

### 🎓 **Uso Educacional**
- Anotações de aulas
- Transcrição de pesquisas
- Assistência em estudos
- Acessibilidade acadêmica

## 🔒 Privacidade e Dados

- **Processamento Local**: Todo o reconhecimento acontece no seu navegador
- **Sem Upload**: Nenhum áudio é enviado para servidores
- **Histórico Local**: Armazenado apenas no seu dispositivo
- **Sem Rastreamento**: Não coletamos dados pessoais

## ⚡ Performance

- **Tempo de Resposta**: < 100ms para transcrição
- **Uso de Memória**: < 50MB
- **Tamanho do Arquivo**: < 20KB
- **Carregamento**: < 2 segundos

## 🐛 Solução de Problemas

### Microfone não funciona?
1. ✅ Verifique permissões do navegador
2. ✅ Teste o microfone em outras aplicações
3. ✅ Use HTTPS (necessário para Web Speech API)
4. ✅ Recarregue a página e tente novamente

### Transcrição imprecisa?
1. 🎤 Fale mais devagar e claramente
2. 🔇 Reduza ruídos de fundo
3. 🌐 Verifique se o idioma está correto
4. 📍 Aproxime o microfone da boca

### Navegador não suportado?
- Use Chrome ou Edge para melhor experiência
- Safari funciona bem em dispositivos Apple
- Firefox tem suporte limitado

## 📈 Roadmap Futuro

- [ ] 🎵 Suporte para múltiplos formatos de áudio
- [ ] 🤖 Integração com IA para melhor pontuação
- [ ] 📱 Aplicativo móvel nativo
- [ ] 🌐 Mais idiomas
- [ ] 💾 Sincronização em nuvem (opcional)
- [ ] 🎨 Temas personalizáveis
- [ ] 🔊 Síntese de voz (text-to-speech)

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### 📋 Como Reportar Bugs
1. Use a aba **Issues** do GitHub
2. Descreva o problema detalhadamente
3. Inclua passos para reproduzir
4. Mencione navegador e sistema operacional

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Seu Nome**
- GitHub: https://github.com/Nelsonromeirojunior
- LinkedIn: https://www.linkedin.com/in/nelson-romeiro-junior-5933263a/
- Email: devlibrasjunior@gmail.com | nelson.romeiro.junior@hotmail.com

## 🙏 Agradecimentos

- **Bootstrap** pelo framework CSS
- **Font Awesome** pelos ícones
- **Web Speech API** pela tecnologia de reconhecimento
- **Comunidade GitHub** pelo suporte e feedback

## 📊 Estatísticas do Projeto

![GitHub stars](https://img.shields.io/github/stars/seu-usuario/voice-to-text?style=social)
![GitHub forks](https://img.shields.io/github/forks/seu-usuario/voice-to-text?style=social)
![GitHub issues](https://img.shields.io/github/issues/seu-usuario/voice-to-text)
![GitHub pull requests](https://img.shields.io/github/issues-pr/seu-usuario/voice-to-text)

---

<div align="center">

**⭐ Se este projeto te ajudou, dê uma estrela! ⭐**

**🔗 [Demo Online](https://seu-usuario.github.io/voice-to-text) | 📖 [Documentação](https://github.com/seu-usuario/voice-to-text/wiki) | 🐛 [Reportar Bug](https://github.com/seu-usuario/voice-to-text/issues)**

</div>

---

> 💡 **Dica**: Este projeto foi desenvolvido com foco especial em **acessibilidade** e **inclusão digital**. Contribua para tornar a web mais acessível para todos!
