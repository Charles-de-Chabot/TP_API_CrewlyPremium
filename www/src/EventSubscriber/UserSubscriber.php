<?php

namespace App\EventSubscriber;

use App\Entity\User;
use App\Repository\RoleRepository;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsDoctrineListener;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Events;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsDoctrineListener(event: Events::prePersist)]
class UserSubscriber
{
    public function __construct(
        private RoleRepository $roleRepository,
        private UserPasswordHasherInterface $passwordHasher
    ) {}

    public function prePersist(PrePersistEventArgs $args): void
    {
        $entity = $args->getObject();

        // On ne s'intéresse qu'aux entités User
        if (!$entity instanceof User) {
            return;
        }

        // Hachage du mot de passe s'il est défini en clair
        if ($entity->getPassword()) {
            $hashedPassword = $this->passwordHasher->hashPassword($entity, $entity->getPassword());
            $entity->setPassword($hashedPassword);
        }

        // Si l'utilisateur a déjà un rôle (ex: créé via un formulaire d'admin), on ne fait rien
        if ($entity->getRole()) {
            return;
        }

        // On cherche le rôle par défaut "ROLE_USER" et on l'assigne
        $defaultRole = $this->roleRepository->findOneBy(['label' => 'ROLE_USER']);

        if (!$defaultRole) {
            throw new \Exception("Erreur critique : Le rôle 'ROLE_USER' est introuvable en base de données. Vérifiez vos fixtures ou l'orthographe.");
        }

        $entity->setRole($defaultRole);
    }
}
