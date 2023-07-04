<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class SendNewMemberNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public $user;
    public function __construct(User $user)
    {
        $this->user=$user;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                      ->greeting('Bonjour ' . $this->user->name)
                      ->line('Nous espérons que vous vous portez bien. Un nouveau compte a été créé pour vous sur notre plateforme. Veuillez vous connecter pour accéder à votre compte.')
                      ->line('Pour ce faire, veuillez cliquer sur le bouton ci-dessous.')
                      ->action('Connexion', url('/login'))
                      ->line('Merci d\'utiliser notre plateforme.')
                      ->salutation('Cordialement, ' . config('app.name') . ' Team')
                      ->subject('Création de compte');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
