interface Pret{
    PretSuivant(Pret : Pret): void;
    TraiterDemande(montant: number): void;
}


abstract class PretBase implements Pret{
    protected pret: Pret | null;
    protected suivant: Pret | null = null;

    public SetSuivant(pret: Pret): void {
        this.suivant = pret;
    }
    constructor(pret?: Pret) {
        this.pret = pret || null;
    }

    public PretSuivant(Pret: Pret): void {
        this.suivant = Pret;
    }

    public TraiterDemande(montant: number): void {
        if (this.suivant) {
            this.suivant.TraiterDemande(montant);
        }
    }
}

class PretEmploye extends PretBase {
    constructor(pret?: Pret) {
        super(pret);
    }

    public TraiterDemande(montant: number): void {
        if (montant <= 100000) {
            console.log("Pret accordé par le employé");
        } else {
            super.TraiterDemande(montant);
        }
    }
}

class PretManager extends PretBase {
    constructor(pret: Pret) {
        super(pret);
    }

    public TraiterDemande(montant: number): void {
        if (montant > 100000 && montant <= 500000) {
            console.log("Pret accordé par le manager");
        } else {
            super.TraiterDemande(montant);
        }
    }
}

class PretChefDDep extends PretBase {
    constructor(pret: Pret) {
        super(pret);
    }

    public TraiterDemande(montant: number): void {
        if (montant > 500000 && montant <= 10000000) {
            console.log("Pret accordé par le chef de département");
        } else {
            super.TraiterDemande(montant);
        }
    }
}

class PretDirecteur extends PretBase {
    constructor(pret: Pret) {
        super(pret);
    }

    public TraiterDemande(montant: number): void {
        if (montant > 10000000) {
            console.log("Pret accordé par le directeur");
        } else {
            super.TraiterDemande(montant);
        }
    }
}

class PicsouBank{
    Main(): void {
        const employe = new PretEmploye(undefined);
        const manager = new PretManager(employe);
        const chefDDep = new PretChefDDep(manager);
        const directeur = new PretDirecteur(chefDDep);

        employe.SetSuivant(manager);
        manager.SetSuivant(chefDDep);
        chefDDep.SetSuivant(directeur);

        employe.TraiterDemande(50000);
        employe.TraiterDemande(150000);
        employe.TraiterDemande(600000);
        employe.TraiterDemande(15000000);
    }
}
