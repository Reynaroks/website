<?php
function studyo22_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'studyo22_setup');

function studyo22_assets() {
    wp_enqueue_style('studyo22-style', get_stylesheet_uri(), array(), '1.0.0');
    wp_enqueue_script('studyo22-effects', get_template_directory_uri() . '/assets/js/effects.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'studyo22_assets');
