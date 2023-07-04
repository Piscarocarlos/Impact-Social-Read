<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Impact Social</title>

    <link rel="shortcut icon" href="{{ asset('assets/images/logo1.png') }}">

    <link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700" rel="stylesheet">
    @routes
    @viteReactRefresh
    @vite(['resources/js/src/main.jsx', "resources/js/src/pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body>
    <noscript>
        <strong>We're sorry but Cork doesn't work properly without JavaScript enabled. Please enable it to
            continue.</strong>
    </noscript>

    @inertia

</body>

</html>
