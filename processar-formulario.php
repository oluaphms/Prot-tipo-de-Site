<?php
// Configurações
$para = "contato@agenciacriativa.com";
$assunto = "Nova mensagem do site - Agência Criativa";

// Verificar se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coletar dados do formulário
    $nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $telefone = filter_input(INPUT_POST, 'telefone', FILTER_SANITIZE_STRING);
    $mensagem = filter_input(INPUT_POST, 'mensagem', FILTER_SANITIZE_STRING);
    
    // Validar dados
    $erros = [];
    
    if (empty($nome)) {
        $erros[] = "Nome é obrigatório";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $erros[] = "E-mail inválido";
    }
    
    if (empty($mensagem)) {
        $erros[] = "Mensagem é obrigatória";
    }
    
    // Se não houver erros, enviar e-mail
    if (empty($erros)) {
        // Montar o corpo do e-mail
        $corpo = "Nome: $nome\n";
        $corpo .= "E-mail: $email\n";
        $corpo .= "Telefone: $telefone\n\n";
        $corpo .= "Mensagem:\n$mensagem";
        
        // Cabeçalhos
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        
        // Tentar enviar o e-mail
        if (mail($para, $assunto, $corpo, $headers)) {
            $resposta = [
                'sucesso' => true,
                'mensagem' => 'Mensagem enviada com sucesso! Em breve entraremos em contato.'
            ];
        } else {
            $resposta = [
                'sucesso' => false,
                'mensagem' => 'Erro ao enviar mensagem. Por favor, tente novamente mais tarde.'
            ];
        }
    } else {
        $resposta = [
            'sucesso' => false,
            'mensagem' => 'Por favor, corrija os seguintes erros:',
            'erros' => $erros
        ];
    }
    
    // Retornar resposta em JSON
    header('Content-Type: application/json');
    echo json_encode($resposta);
    exit;
}
?> 