<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div class="cursor-glow" aria-hidden="true"></div>
<header class="header site-shell">
  <a class="logo" href="<?php echo esc_url(home_url('/')); ?>">Stüdyo <span>22</span></a>
  <nav class="nav" aria-label="Ana menü">
    <a href="#anasayfa">Ana Sayfa</a>
    <a href="#hizmetler">Hizmetler</a>
    <a href="#portfolyo">Portfolyo</a>
    <a href="#randevu">Randevu</a>
  </nav>
</header>
