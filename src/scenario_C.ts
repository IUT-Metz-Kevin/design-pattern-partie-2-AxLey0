interface TekeKommande{
    Execute(): void;
}

class PowerOn implements TekeKommande
{
    public Execute(): void
    {
        console.log("Commande éxécuter : Allumer la television"); 
    }
}

class PowerOff implements TekeKommande
{
    public Execute(): void
    {
        console.log("Commande éxécuter : Eteindre la television"); 
    }
}

class NetflixBtn implements TekeKommande
{
    public Execute(): void
    {
        console.log("Commande éxécuter : Accéder à Netflix"); 
    }
}

class AmazonBtn implements TekeKommande
{
    public Execute(): void
    {
        console.log("Commande éxécuter : Accéder à Amazon Prime"); 
    }
}

class DisneyBtn implements TekeKommande
{
    public Execute(): void
    {
        console.log("Commande éxécuter : Accéder à Disney+"); 
    }
}

class GetChaine implements TekeKommande
{
    public Execute(): void
    {
        console.log("Commande éxécuter : Afficher le numéro de chaine"); 
    }
}

class Btn{
    private _commande!: TekeKommande;

    public SetCommande(commande: TekeKommande): void
    {
        this._commande = commande;
    }

    public Appuyer(): void
    {
        this._commande.Execute();
    }
}

class Television{
    static Main(): void{
        const telecommande: Btn = new Btn();
        const allumer: PowerOn = new PowerOn();
        const eteindre: PowerOff = new PowerOff();
        const netflix: NetflixBtn = new NetflixBtn();
        const amazon: AmazonBtn = new AmazonBtn();
        const disney: DisneyBtn = new DisneyBtn();
        const chaine: GetChaine = new GetChaine();

        telecommande.SetCommande(allumer);
        telecommande.Appuyer();

        telecommande.SetCommande(eteindre);
        telecommande.Appuyer();

        telecommande.SetCommande(netflix);
        telecommande.Appuyer();

        telecommande.SetCommande(amazon);
        telecommande.Appuyer();

        telecommande.SetCommande(disney);
        telecommande.Appuyer();

        telecommande.SetCommande(chaine);
        telecommande.Appuyer();
    }
}