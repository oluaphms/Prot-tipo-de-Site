// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Formulário de contato
document.getElementById('form-contato')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Mostrar indicador de carregamento
  const submitButton = this.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.classList.add('loading');
  submitButton.textContent = 'Enviando...';
  
  // Coletar dados do formulário
  const formData = new FormData(this);
  
  // Enviar dados via AJAX
  fetch('processar-formulario.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    // Remover indicador de carregamento
    submitButton.classList.remove('loading');
    submitButton.textContent = originalText;
    
    if (data.sucesso) {
      // Feedback de sucesso
      alert(data.mensagem);
      // Limpar formulário
      this.reset();
    } else {
      // Feedback de erro
      if (data.erros && data.erros.length > 0) {
        alert(data.mensagem + '\n\n' + data.erros.join('\n'));
      } else {
        alert(data.mensagem);
      }
    }
  })
  .catch(error => {
    // Remover indicador de carregamento
    submitButton.classList.remove('loading');
    submitButton.textContent = originalText;
    
    // Feedback de erro
    console.error('Erro:', error);
    alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.');
  });
});

// Menu mobile
const menuButton = document.createElement('button');
menuButton.className = 'menu-mobile';
menuButton.innerHTML = '<i class="fa fa-bars"></i>';
document.querySelector('header .container').appendChild(menuButton);

menuButton.addEventListener('click', function() {
  document.querySelector('nav ul').classList.toggle('active');
});

// Animação ao scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.pacote, .etapa, .depoimento');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight * 0.75) {
      element.classList.add('animate');
    }
  });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Validação de formulário
const validateForm = () => {
  const inputs = document.querySelectorAll('#form-contato input, #form-contato textarea');
  
  inputs.forEach(input => {
    input.addEventListener('invalid', function(e) {
      e.preventDefault();
      this.classList.add('error');
    });
    
    input.addEventListener('input', function() {
      if (this.validity.valid) {
        this.classList.remove('error');
      }
    });
  });
};

validateForm();

// Contador de caracteres para o campo de mensagem
const messageField = document.getElementById('mensagem');
if (messageField) {
  const maxLength = 500;
  messageField.maxLength = maxLength;
  
  const counter = document.createElement('div');
  counter.className = 'contador-caracteres';
  messageField.parentNode.appendChild(counter);
  
  messageField.addEventListener('input', function() {
    const remaining = maxLength - this.value.length;
    counter.textContent = `${remaining} caracteres restantes`;
  });
  
  // Dispara o evento input para mostrar o contador inicial
  messageField.dispatchEvent(new Event('input'));
} 