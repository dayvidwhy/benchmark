<!DOCTYPE html>
<html class="h-full" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
</head>
<body class="h-full">
    <div class="h-full" id="app" data-page="{{ json_encode($page) }}"></div>
</body>
</html>