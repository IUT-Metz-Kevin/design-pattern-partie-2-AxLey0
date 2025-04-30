class Livre {
    constructor(
        public titre: string,
        public auteur: string,
        public genre: string,
        public dateAcquisition: Date,
        public zone: number,
        public emplacement: number
    ) {}
}

interface Iterateur<T> {
    aSuivant(): boolean;
    suivant(): T | null;
}

class IterateurLivre implements Iterateur<Livre> {
    private position: number = 0;

    constructor(private livres: Livre[]) {}

    aSuivant(): boolean {
        return this.position < this.livres.length;
    }

    suivant(): Livre | null {
        return this.aSuivant() ? this.livres[this.position++] : null;
    }
}

class Bibliotheque {
    private livres: Livre[] = [];

    ajouterLivre(livre: Livre): void {
        this.livres.push(livre);
    }

    trierLivres(par: 'titre' | 'auteur' | 'genre' | 'dateAcquisition'): Livre[] {
        return [...this.livres].sort((a, b) => 
            par === 'dateAcquisition' 
                ? a.dateAcquisition.getTime() - b.dateAcquisition.getTime() 
                : a[par].localeCompare(b[par])
        );
    }
}

class InterfaceLecteur {
    constructor(private bibliotheque: Bibliotheque) {}

    parcourirLivres(par: 'titre' | 'auteur' | 'genre' | 'dateAcquisition'): void {
        const livres = this.bibliotheque.trierLivres(par);
        const iterateur = new IterateurLivre(livres);
        while (iterateur.aSuivant()) {
            const livre = iterateur.suivant();
            if (livre) {
                console.log(`Titre: ${livre.titre}, Auteur: ${livre.auteur}, Zone: ${livre.zone}, Emplacement: ${livre.emplacement}`);
            }
        }
    }
}

class Recherche {
    static main(): void {
        const bibliotheque = new Bibliotheque();

        bibliotheque.ajouterLivre(new Livre("Le Petit Prince", "Antoine de Saint-Exupéry", "Fiction", new Date(2020, 5, 15), 1, 101));
        bibliotheque.ajouterLivre(new Livre("1984", "George Orwell", "Dystopie", new Date(2019, 3, 10), 2, 202));
        bibliotheque.ajouterLivre(new Livre("Les Misérables", "Victor Hugo", "Classique", new Date(2021, 7, 20), 3, 303));

        const interfaceLecteur = new InterfaceLecteur(bibliotheque);

        console.log("Livres triés par titre:");
        interfaceLecteur.parcourirLivres('titre');

        console.log("\nLivres triés par auteur:");
        interfaceLecteur.parcourirLivres('auteur');

        console.log("\nLivres triés par genre:");
        interfaceLecteur.parcourirLivres('genre');

        console.log("\nLivres triés par date d'acquisition:");
        interfaceLecteur.parcourirLivres('dateAcquisition');
    }
}

Recherche.main();