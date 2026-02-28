<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\BoatRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BoatRepository::class)]
#[ApiResource]
class Boat
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column]
    private ?bool $used = null;

    #[ORM\Column]
    private ?float $dayPrice = null;

    #[ORM\Column]
    private ?float $weekPrice = null;

    #[ORM\Column]
    private ?\DateTime $created_at = null;

    #[ORM\Column]
    private ?\DateTime $updated_at = null;

    #[ORM\Column]
    private ?bool $is_active = null;

    #[ORM\ManyToOne(inversedBy: 'boats')]
    #[ORM\JoinColumn(nullable: false)]
    private ?BoatInfo $boatinfo = null;

    #[ORM\ManyToOne(inversedBy: 'boats')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Type $boatType = null;

    #[ORM\ManyToOne(inversedBy: 'boats')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Model $boatModel = null;

    #[ORM\ManyToOne(inversedBy: 'boats')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Address $address = null;

    /**
     * @var Collection<int, Media>
     */
    #[ORM\OneToMany(targetEntity: Media::class, mappedBy: 'boat')]
    private Collection $media;

    #[ORM\ManyToOne(inversedBy: 'boat')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Rental $rental = null;

    /**
     * @var Collection<int, Formula>
     */
    #[ORM\ManyToMany(targetEntity: Formula::class, mappedBy: 'boat')]
    private Collection $formulas;

    public function __construct()
    {
        $this->media = new ArrayCollection();
        $this->formulas = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

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

    public function isUsed(): ?bool
    {
        return $this->used;
    }

    public function setUsed(bool $used): static
    {
        $this->used = $used;

        return $this;
    }

    public function getDayPrice(): ?float
    {
        return $this->dayPrice;
    }

    public function setDayPrice(float $dayPrice): static
    {
        $this->dayPrice = $dayPrice;

        return $this;
    }

    public function getWeekPrice(): ?float
    {
        return $this->weekPrice;
    }

    public function setWeekPrice(float $weekPrice): static
    {
        $this->weekPrice = $weekPrice;

        return $this;
    }

    public function getCreatedAt(): ?\DateTime
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTime $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTime
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(\DateTime $updated_at): static
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->is_active;
    }

    public function setIsActive(bool $is_active): static
    {
        $this->is_active = $is_active;

        return $this;
    }

    public function getBoatinfo(): ?BoatInfo
    {
        return $this->boatinfo;
    }

    public function setBoatinfo(?BoatInfo $boatinfo): static
    {
        $this->boatinfo = $boatinfo;

        return $this;
    }

    public function getBoatType(): ?Type
    {
        return $this->boatType;
    }

    public function setBoatType(?Type $boatType): static
    {
        $this->boatType = $boatType;

        return $this;
    }

    public function getBoatModel(): ?Model
    {
        return $this->boatModel;
    }

    public function setBoatModel(?Model $boatModel): static
    {
        $this->boatModel = $boatModel;

        return $this;
    }

    public function getAddress(): ?Address
    {
        return $this->address;
    }

    public function setAddress(?Address $address): static
    {
        $this->address = $address;

        return $this;
    }

    /**
     * @return Collection<int, Media>
     */
    public function getMedia(): Collection
    {
        return $this->media;
    }

    public function addMedium(Media $medium): static
    {
        if (!$this->media->contains($medium)) {
            $this->media->add($medium);
            $medium->setBoat($this);
        }

        return $this;
    }

    public function removeMedium(Media $medium): static
    {
        if ($this->media->removeElement($medium)) {
            // set the owning side to null (unless already changed)
            if ($medium->getBoat() === $this) {
                $medium->setBoat(null);
            }
        }

        return $this;
    }

    public function getRental(): ?Rental
    {
        return $this->rental;
    }

    public function setRental(?Rental $rental): static
    {
        $this->rental = $rental;

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
            $formula->addBoat($this);
        }

        return $this;
    }

    public function removeFormula(Formula $formula): static
    {
        if ($this->formulas->removeElement($formula)) {
            $formula->removeBoat($this);
        }

        return $this;
    }
}
