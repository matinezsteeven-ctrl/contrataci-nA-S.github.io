<?php
/**
 * A&S Contracting contact form handler.
 * IMPORTANT: replace the recipient below with the real business email.
 * This script requires a PHP-enabled host with mail() configured.
 */

declare(strict_types=1);

const CONTACT_EMAIL = 'albertosonllc@gmail.com';
const SITE_NAME = 'A&S Contracting';

function return_to_form(string $status): void {
    header('Location: index.html?contacto=' . rawurlencode($status) . '#contacto', true, 303);
    exit;
}

function text_length(string $value): int {
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: index.html#contacto', true, 303);
    exit;
}

// Honeypot anti-spam: real visitors should leave this field empty.
if (!empty($_POST['empresa_website'] ?? '')) {
    return_to_form('enviado');
}

if (!filter_var(CONTACT_EMAIL, FILTER_VALIDATE_EMAIL)) {
    return_to_form('config');
}

$nombre = trim((string)($_POST['nombre'] ?? ''));
$correo = trim((string)($_POST['correo'] ?? ''));
$telefono = trim((string)($_POST['telefono'] ?? ''));
$tipo = trim((string)($_POST['tipo_proyecto'] ?? ''));
$mensaje = trim((string)($_POST['mensaje'] ?? ''));
$privacidad = (string)($_POST['privacidad'] ?? '');

if (text_length($nombre) < 2 || text_length($nombre) > 100 ||
    !filter_var($correo, FILTER_VALIDATE_EMAIL) || text_length($correo) > 150 ||
    text_length($telefono) > 35 || text_length($mensaje) < 10 || text_length($mensaje) > 4000 ||
    $tipo === '' || $privacidad !== 'acepto') {
    return_to_form('error');
}

// Remove control characters from header-bound values to prevent header injection.
$nombreHeader = str_replace(["\r", "\n"], ' ', $nombre);
$correoHeader = str_replace(["\r", "\n"], '', $correo);
$subject = 'Nueva solicitud de cotización - ' . SITE_NAME;
$body = "Nueva solicitud recibida desde la página web.\n\n" .
        "Nombre: {$nombre}\n" .
        "Correo: {$correo}\n" .
        "Teléfono: " . ($telefono !== '' ? $telefono : 'No proporcionado') . "\n" .
        "Tipo de proyecto: {$tipo}\n\n" .
        "Mensaje:\n{$mensaje}\n";

$host = preg_replace('/[^a-z0-9.-]/i', '', (string)($_SERVER['HTTP_HOST'] ?? 'localhost'));
$host = $host !== '' ? $host : 'localhost';
$headers = [
    'From' => 'Formulario web <no-reply@' . $host . '>',
    'Reply-To' => $nombreHeader . ' <' . $correoHeader . '>',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'X-Mailer' => 'PHP/' . phpversion(),
];

$sent = @mail(CONTACT_EMAIL, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body,
    implode("\r\n", array_map(static fn($key, $value) => $key . ': ' . $value, array_keys($headers), $headers)));

return_to_form($sent ? 'enviado' : 'error');
