<?php

namespace App\Entity;

use App\Repository\StatisticRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: StatisticRepository::class)]
class Statistic
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $label = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column]
    private ?int $value = null;

    /**
     * @var Collection<int, Crew>
     */
    #[ORM\ManyToMany(targetEntity: Crew::class, mappedBy: 'statistic')]
    private Collection $crews;

    public function __construct()
    {
        $this->crews = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getValue(): ?int
    {
        return $this->value;
    }

    public function setValue(int $value): static
    {
        $this->value = $value;

        return $this;
    }

    /**
     * @return Collection<int, Crew>
     */
    public function getCrews(): Collection
    {
        return $this->crews;
    }

    public function addCrew(Crew $crew): static
    {
        if (!$this->crews->contains($crew)) {
            $this->crews->add($crew);
            $crew->addStatistic($this);
        }

        return $this;
    }

    public function removeCrew(Crew $crew): static
    {
        if ($this->crews->removeElement($crew)) {
            $crew->removeStatistic($this);
        }

        return $this;
    }
}
