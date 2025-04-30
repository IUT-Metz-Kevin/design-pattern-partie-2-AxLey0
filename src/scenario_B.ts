interface TourDeControle {
    demanderAtterrissage(avion: Avion): void;
    demanderDecollage(avion: Avion): void;
    notifierPisteDisponible(piste: Piste): void;
}

class TourDeControleBase implements TourDeControle {
    private pistes: Piste[] = [];
    private fileAttenteAtterrissage: Avion[] = [];
    private fileAttenteDecollage: Avion[] = [];

    enregistrerPiste(piste: Piste): void {
        this.pistes.push(piste);
    }

    demanderAtterrissage(avion: Avion): void {
        const pisteDisponible = this.pistes.find((piste) => piste.estDisponible());
        if (pisteDisponible) {
            pisteDisponible.assignerAvion(avion);
            console.log(`L'avion ${avion.id} atterrit sur la piste ${pisteDisponible.id}.`);
        } else {
            console.log(`L'avion ${avion.id} attend pour atterrir.`);
            this.fileAttenteAtterrissage.push(avion);
        }
    }

    demanderDecollage(avion: Avion): void {
        const pisteDisponible = this.pistes.find((piste) => piste.estDisponible());
        if (pisteDisponible) {
            pisteDisponible.assignerAvion(avion);
            console.log(`L'avion ${avion.id} décolle de la piste ${pisteDisponible.id}.`);
        } else {
            console.log(`L'avion ${avion.id} attend pour décoller.`);
            this.fileAttenteDecollage.push(avion);
        }
    }

    notifierPisteDisponible(piste: Piste): void {
        if (this.fileAttenteAtterrissage.length > 0) {
            const avion = this.fileAttenteAtterrissage.shift()!;
            piste.assignerAvion(avion);
            console.log(`L'avion ${avion.id} atterrit sur la piste ${piste.id}.`);
        } else if (this.fileAttenteDecollage.length > 0) {
            const avion = this.fileAttenteDecollage.shift()!;
            piste.assignerAvion(avion);
            console.log(`L'avion ${avion.id} décolle de la piste ${piste.id}.`);
        } else {
            console.log(`La piste ${piste.id} est maintenant disponible.`);
        }
    }
}

class Piste {
    private avion: Avion | null = null;

    constructor(public id: string, private mediateur: TourDeControle) {}

    estDisponible(): boolean {
        return this.avion === null;
    }

    assignerAvion(avion: Avion): void {
        this.avion = avion;
        setTimeout(() => {
            this.avion = null;
            console.log(`La piste ${this.id} est maintenant libre.`);
            this.mediateur.notifierPisteDisponible(this);
        }, 3000);
    }
}

class Avion {
    constructor(public id: string) {}
}

class Aeroport{
    main(){
        const tourDeControle = new TourDeControleBase();
        const piste1 = new Piste("Piste 1", tourDeControle);
        const piste2 = new Piste("Piste 2", tourDeControle);

        tourDeControle.enregistrerPiste(piste1);
        tourDeControle.enregistrerPiste(piste2);

        const avion1 = new Avion("Avion 1");
        const avion2 = new Avion("Avion 2");
        const avion3 = new Avion("Avion 3");

        tourDeControle.demanderAtterrissage(avion1);
        tourDeControle.demanderAtterrissage(avion2);
        tourDeControle.demanderDecollage(avion3);

    }
}
