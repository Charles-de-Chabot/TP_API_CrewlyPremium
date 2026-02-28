<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\RentalRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RentalRepository::class)]
#[ApiResource]
class Rental
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?\DateTime $rentalStart = null;

    #[ORM\Column]
    private ?\DateTime $rentalEnd = null;

    #[ORM\Column]
    private ?float $rentalPrice = null;

    #[ORM\ManyToOne(inversedBy: 'rentals')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    /**
     * @var Collection<int, Boat>
     */
    #[ORM\OneToMany(targetEntity: Boat::class, mappedBy: 'rental')]
    private Collection $boat;

    /**
     * @var Collection<int, Formula>
     */
    #[ORM\ManyToMany(targetEntity: Formula::class, mappedBy: 'rental')]
    private Collection $formulas;

    /**
     * @var Collection<int, Fitting>
     */
    #[ORM\ManyToMany(targetEntity: Fitting::class, inversedBy: 'rentals')]
    private Collection $fitting;

    public function __construct()
    {
        $this->boat = new ArrayCollection();
        $this->formulas = new ArrayCollection();
        $this->fitting = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRentalStart(): ?\DateTime
    {
        return $this->rentalStart;
    }

    public function setRentalStart(\DateTime $rentalStart): static
    {
        $this->rentalStart = $rentalStart;

        return $this;
    }

    public function getRentalEnd(): ?\DateTime
    {
        return $this->rentalEnd;
    }

    public function setRentalEnd(\DateTime $rentalEnd): static
    {
        $this->rentalEnd = $rentalEnd;

        return $this;
    }

    public function getRentalPrice(): ?float
    {
        return $this->rentalPrice;
    }

    public function setRentalPrice(float $rentalPrice): static
    {
        $this->rentalPrice = $rentalPrice;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, Boat>
     */
    public function getBoat(): Collection
    {
        return $this->boat;
    }

    public function addBoat(Boat $boat): static
    {
        if (!$this->boat->contains($boat)) {
            $this->boat->add($boat);
            $boat->setRental($this);
        }

        return $this;
    }

    public function removeBoat(Boat $boat): static
    {
        if ($this->boat->removeElement($boat)) {
            // set the owning side to null (unless already changed)
            if ($boat->getRental() === $this) {
                $boat->setRental(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Formula>
     */
    public function getFormulas(): Collection
    {
        return $this->formulas;
    }

    public function addFormula(Formula $formula): static
    {
        if (!$this->formulas->contains($formula)) {
            $this->formulas->add($formula);
            $formula->addRental($this);
        }

        return $this;
    }

    public function removeFormula(Formula $formula): static
    {
        if ($this->formulas->removeElement($formula)) {
            $formula->removeRental($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Fitting>
     */
    public function getFitting(): Collection
    {
        return $this->fitting;
    }

    public function addFitting(Fitting $fitting): static
    {
        if (!$this->fitting->contains($fitting)) {
            $this->fitting->add($fitting);
        }

        return $this;
    }

    public function removeFitting(Fitting $fitting): static
    {
        $this->fitting->removeElement($fitting);

        return $this;
    }
}
