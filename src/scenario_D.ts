interface Options{
    trier(niveau: 1 | 2 | 3): void;
}

class TriageCouleur implements Options{

    _optionCouleurs!: string;

    public ChoixOption(option: string): void {
        this._optionCouleurs = option;
        console.log(`Option choisie : ${option}`);
    }

    public trier(niveau: 1 | 2 | 3): void {
        console.log(`Triage par couleur : ${this._optionCouleurs} au niveau ${niveau}`);
    }
}

class TriageType implements Options{

    _optionType!: string;

    public ChoixOption(option: string): void {
        this._optionType = option;
        console.log(`Option choisie : ${option}`);
    }

    public trier(niveau: 1 | 2 | 3): void {
        console.log(`Triage par type : ${this._optionType} au niveau ${niveau}`);
    }
}

class TriageSalete implements Options{

    _optionSalete!: string;

    public ChoixOption(option: string): void {
        this._optionSalete = option;
        console.log(`Option choisie : ${option}`);
    }

    public trier(niveau: 1 | 2 | 3): void {
        console.log(`Triage par niveau de saleté : ${this._optionSalete} au niveau ${niveau}`);
    }
}

class Machine {
    private readonly _options: Options[] = [];

    public ChoixTriage(option: Options): void {
        this._options.push(option);
        console.log(`Option choisie : ${option}`);
    }
    public trier(niveau: 1 | 2 | 3): void {
        for (const option of this._options) {
            option.trier(niveau);
        }
    }
}

class Cycle {
    main(): void {
        const machine = new Machine();

        const triCouleur = new TriageCouleur();
        triCouleur.ChoixOption("Rouge");
        machine.ChoixTriage(triCouleur);

        const triType = new TriageType();
        triType.ChoixOption("Coton");
        machine.ChoixTriage(triType);

        const triSalete = new TriageSalete();
        triSalete.ChoixOption("Sale");
        machine.ChoixTriage(triSalete);

        machine.trier(2);
    }
}