interface State {
    attack(): void;
    move(): void;
    jump(): void;
    idle(): void;
}

class Character {
    private state: State;

    constructor(initialState: State) {
        this.state = initialState;
    }

    setState(state: State): void {
        console.log(`Changement d'état : ${state.constructor.name}`);
        this.state = state;
    }

    attack(): void {
        this.state.attack();
    }

    move(): void {
        this.state.move();
    }

    jump(): void {
        this.state.jump();
    }

    idle(): void {
        this.state.idle();
    }
}

class IdleState implements State {
    constructor(private character: Character) {}

    attack(): void {
        console.log("Le personnage attaque depuis l'état inactif.");
        this.character.setState(new AttackState(this.character));
    }

    move(): void {
        console.log("Le personnage commence à se déplacer.");
        this.character.setState(new MoveState(this.character));
    }

    jump(): void {
        console.log("Le personnage saute depuis l'état inactif.");
        this.character.setState(new JumpState(this.character));
    }

    idle(): void {
        console.log("Le personnage est déjà inactif.");
    }
}

class AttackState implements State {
    constructor(private character: Character) {}

    attack(): void {
        console.log("Le personnage continue d'attaquer.");
    }

    move(): void {
        console.log("Impossible de se déplacer en attaquant.");
    }

    jump(): void {
        console.log("Impossible de sauter en attaquant.");
    }

    idle(): void {
        console.log("Le personnage arrête d'attaquer et devient inactif.");
        this.character.setState(new IdleState(this.character));
    }
}

class MoveState implements State {
    constructor(private character: Character) {}

    attack(): void {
        console.log("Le personnage attaque en se déplaçant.");
        this.character.setState(new AttackState(this.character));
    }

    move(): void {
        console.log("Le personnage est déjà en train de se déplacer.");
    }

    jump(): void {
        console.log("Le personnage saute en se déplaçant.");
        this.character.setState(new JumpState(this.character));
    }

    idle(): void {
        console.log("Le personnage arrête de se déplacer et devient inactif.");
        this.character.setState(new IdleState(this.character));
    }
}

class JumpState implements State {
    constructor(private character: Character) {}

    attack(): void {
        console.log("Le personnage attaque en sautant.");
        this.character.setState(new AttackState(this.character));
    }

    move(): void {
        console.log("Impossible de se déplacer en sautant.");
    }

    jump(): void {
        console.log("Le personnage est déjà en train de sauter.");
    }

    idle(): void {
        console.log("Le personnage atterrit et devient inactif.");
        this.character.setState(new IdleState(this.character));
    }
}

class StunnedState implements State {
    constructor(private character: Character) {}

    attack(): void {
        console.log("Impossible d'attaquer en étant étourdi.");
    }

    move(): void {
        console.log("Impossible de se déplacer en étant étourdi.");
    }

    jump(): void {
        console.log("Impossible de sauter en étant étourdi.");
    }

    idle(): void {
        console.log("Le personnage est étourdi et ne peut rien faire.");
    }
}