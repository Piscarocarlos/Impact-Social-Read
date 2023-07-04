import React, { useState, useEffect } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';
import Select from 'react-select';

export default function Create() {
    const { famille, pack, partenaire, statut, devise, service, contact, beneficiary, critere,
        reporting, region, province, ville, filiere, year, situation, handicap, logement, orphelin,convention } = usePage().props;




    const [selectedFamilly, setSelectedFamilly] = useState([]);

    const [selectedModePartner, setSelectedModePartner] = useState([]);
    const [selectedCritereSelected, setSelectedCritereSelected] = useState([]);
    const [selectedOpenBookSelected, setSelectedOpenBookSelected] = useState([]);
    const [selectedCompteSelected, setSelectedCompteSelected] = useState([]);



    const [selectedBeneficiary, setSelectedBeneficiary] = useState("");

    //const [selectedCritereService, setSelectedCritereService] = useState("");
    const [selectedTypeCritereBeneficiary, setSelectedTypeCritereBeneficiary] = useState("");

    //POUR AFFECTER UNE VALEUR DYNAMIC AU CHAMP DUREE DE LA CONVENTION
    const [dynamicValueDureeConvention, setDynamicValueDureeConvention] = useState([]);
    //pour les contacts partenaires
    const [valueContact, setvalueContact] = useState([]);






const myData=JSON.parse(convention.data)

console.log(myData)
console.log("message :",myData.dateEffetFile)

    const { data, post, setData, processing, errors } = useForm({
        id:convention.id,
        /**premier bloc */
        newConvention: myData.newConvention,
        reference: myData.reference,
        familleConvention:myData.familleConvention,
        packConvention: myData.packConvention,

        numberPartner: 1,
        partnerId: myData.partnerId,
        contactPartner: myData.contactPartner,
        statutConvention: myData.statutConvention,

        dateSignature: myData.dateSignature,
        dureeConvention: myData.dureeConvention,
        typeConvention: myData.typeConvention,
        dureeEnAnnee: myData.dureeEnAnnee,
        numberCohorte: myData.numberCohorte,

        fileConvention: myData.fileConvention,
        dateEffetFile: myData.dateEffetFile,
        dateFinFile: myData.dateFinFile,

        dureeAccompagnement: myData.dureeAccompagnement,
        numberBeneficiary: myData.numberBeneficiary,
        periodeAccompagnement: myData.periodeAccompagnement,
        numberBeneficiaryMax: myData.numberBeneficiaryMax,
        preavis: myData.preavis,
        echeance: myData.echeance,
        dateEffet: myData.dateEffet,
        dateFin: myData.dateFin,

        montantGlobal: myData.montantGlobal,
        devise: myData.devise,
        contributionPartnaire: myData.contributionPartnaire,
        echeancierReglement: myData.echeancierReglement,
        dateEcheanceReglement: myData.dateEcheanceReglement,
        montantReglement: myData.montantReglement,

        dateLimiteSelection: myData.dateLimiteSelection,
        numberBeneficiaryNextCohort: myData.numberBeneficiaryNextCohort,
        modePartner: myData.modePartner,
        critereSelected: myData.critereSelected,

        typeBeneficiary: myData.typeBeneficiary,
        typeCritereBeneficiary: myData.typeCritereBeneficiary,

        validateBeneficiary: myData.validateBeneficiary,
        openBook: myData.openBook,
        accountBank: myData.accountBank,
        service: myData.service,

        modelReporting: myData.modelReporting,
        ribConvention: myData.ribConvention,
        //la partie des critere
        region: myData.region,
        province: myData.province,
        ville: myData.ville,
        genre: myData.genre,
        noteBacRegional: myData.noteBacRegional,
        noteSemestre: myData.noteSemestre,
        filiere: myData.filiere,
        year: myData.year,
        situation: myData.situation,
        handicap: myData.handicap,
        eps: myData.eps,
        logement: myData.logement,
        orphelin: myData.orphelin,
        priseCharge: myData.priseCharge,
        montantPension: myData.montantPension,
        revenu: myData.revenu,
        nbreFrSr: myData.nbreFrSr,

    });

    useEffect(
        () => {
            if (data.newConvention["value"] == "Oui") {
                data.reference = ""
            }
        }, [data.newConvention],

    )
    useEffect(() => {
        if (data.dureeConvention == "MONO-COHORTE FERME") {
            data.numberCohorte = ""


            data.dureeAccompagnement = ""
            data.numberBeneficiary = ""
            data.periodeAccompagnement = ""
            data.numberBeneficiaryMax = ""
            data.preavis = ""
            data.echeance = ""
        }
        else if (data.dureeConvention == "PLURI-COHORTE") {
            data.periodeAccompagnement = ""
            data.preavis = ""
            data.echeance = ""
        }
        else if (data.dureeConvention == "ANNUELLE RENOUVELABLE") {
            data.dureeAccompagnement = ""
            data.numberBeneficiary = ""
            data.periodeAccompagnement = ""
        }
        else if (data.dureeConvention == "ANNUELLE FERME") {
            data.dureeAccompagnement = ""
            data.numberBeneficiary = ""
            data.periodeAccompagnement = ""
            data.preavis = ""
        }
        else {
            data.dureeAccompagnement = ""
            data.numberBeneficiary = ""
            data.periodeAccompagnement = ""
            data.numberBeneficiaryMax = ""
            data.preavis = ""
        }
    }, [data.dureeConvention]
    )
    useEffect(() => {
        if (data.dureeConvention == "ANNUELLE RENOUVELABLE" || data.dureeConvention == "ANNUELLE FERME" || data.dureeConvention == "OUVERTE") {
            const newData2 = { ...data, numberCohorte: "", dureeEnAnnee: "" }
            setData(newData2)

        }
    }, [data.dureeConvention])
    useEffect(() => {
        if (data.typeConvention != "Pack" && data.typeConvention != "Ecrite") {
            const newData3 = { ...data, fileConvention: "", dateEffetFile: "", dateFinFile: "" }
            setData(newData3)
        }
    }, [data.typeConvention])

    useEffect(() => {
        if (data.critereSelected["value"] == "Non") {
            data.typeBeneficiary = ""
            data.region = ""
            data.province = ""
            data.ville = ""
            data.genre = ""
            data.noteBacRegional = ""
            data.noteSemestre = ""
            data.filiere = ""
            data.year = ""
            data.situation = ""
            data.handicap = ""
            data.eps = ""
            data.logement = ""
            data.orphelin = ""
            data.priseCharge = ""
            data.montantPension = ""
            data.revenu = ""
            data.nbreFrSr = ""
        }
    }, [data.critereSelected])

    useEffect(() => {

        if (data.openBook["value"] == "Non") {
            data.modelReporting = ""
        }
    }, [data.openBook])

    useEffect(() => {

        if (data.accountBank["value"] == "Non") {
            data.ribConvention = ""
        }
    }, [data.accountBank])



    const optionNewConvention = [
        { value: 'Oui', label: 'Oui' },
        { value: 'Non', label: 'Non' },
    ];

    const optionFamille = famille.map(item => (
        { key: item.id, "value": item.id, "label": item.name_family }
    ));

    const optionPack = pack.map(item => (
        { key: item.id, "value": item.name_pack, "label": item.name_pack }
    ));

    const optionPartner = partenaire.map(item => (
        { key: item.id, "value": item.id, "label": item.name_partner }
    ));

    const optionStatut = statut.map(item => (
        { key: item.id, "value": item.title, "label": item.title }
    ));

    const optionDevise = devise.map(item => (
        { key: item.id, "value": item.type_devise, "label": item.type_devise }
    ));

    const optionBeneficiary = beneficiary.map(item => (
        { key: item.id, "value": item.type_beneficiary, "label": item.type_beneficiary }
    ));

    const optionModePartner = [
        { value: 'Oui', label: 'Oui' },
        { value: 'Non', label: 'Non' },
    ];

    const optionCritereSelected = [
        { value: 'Oui', label: 'Oui' },
        { value: 'Non', label: 'Non' },
    ];

    const optionValidateSelected = [
        { value: 'Oui', label: 'Oui' },
        { value: 'Non', label: 'Non' },
    ];

    const optionOpenBook = [
        { value: 'Oui', label: 'Oui' },
        { value: 'Non', label: 'Non' },
    ];

    const optionCompte = [
        { value: 'Oui', label: 'Oui' },
        { value: 'Non', label: 'Non' },
    ];


    const optionService = service.map(item => (
        { key: item.id, "value": item.name_service, "label": item.name_service, }
    ));

    const optionContact = contact.map(item => (
        { key: item.id, "value": item.id, "label": item.name + " " + item.first_name, }
    ));

    const optionCritereService = critere.map(item => (
        { key: item.id, "value": item.critere, "label": item.critere }
    ));

    const optionModelReporting = reporting.map(item => (
        { key: item.id, "value": item.type, "label": item.type }
    ));
    //la partie des critère
    const optionRegion = region.map(item => (
        { key: item.id, "value": item.name_region, "label": item.name_region }
    ));
    const optionProvince = province.map(item => (
        { key: item.id, "value": item.name_province, "label": item.name_province }
    ));
    const optionVille = ville.map(item => (
        { key: item.id, "value": item.name_city, "label": item.name_city }
    ));
    const optionGenre = [
        { value: 'Masculin', label: 'Masculin' },
        { value: 'Féminin', label: 'Féminin' },
    ];
    const optionFiliere = filiere.map(item => (
        { key: item.id, "value": item.name_filiere, "label": item.name_filiere }
    ));
    const optionYear = year.map(item => (
        { key: item.id, "value": item.year_bac, "label": item.year_bac }
    ));
    const optionSituation = situation.map(item => (
        { key: item.id, "value": item.name_situation, "label": item.name_situation }
    ));
    const optionHandicap = handicap.map(item => (
        { key: item.id, "value": item.type_handicap, "label": item.type_handicap }
    ));
    const optionEPS = [
        { value: 'Oui', label: 'Oui' },
        { value: 'Non', label: 'Non' },
    ];
    const optionLogement = logement.map(item => (
        { key: item.id, "value": item.name_logement, "label": item.name_logement }
    ));
    const optionOrphelin = orphelin.map(item => (
        { key: item.id, "value": item.name_type, "label": item.name_type }
    ));
    const optionPriseCharge = [
        { value: 'Le père', label: 'Le père' },
        { value: 'La mère', label: 'La mère' },
    ];


    const handleNewConventionChange = (event) => {
        setData("newConvention", event)
    };

    const handleFamillyChange = (event) => {
        const selectedValues = [];
        data.familleConvention = event
        setSelectedFamilly(selectedValues);
        //pour affecter une valeur dynamique a la duree de la convention
        const engagement = famille.find(item => item.id === data.familleConvention["value"])["engagement"];
        const type = famille.find(item => item.id === data.familleConvention["value"])["type_convention"];
        //console.log(data.typeConvention)
        const obj1 = JSON.parse(engagement);
        data.dureeConvention = obj1.value
        //console.log(data.dureeConvention)

        const obj2 = JSON.parse(type);
        data.typeConvention = obj2.value

    };

    const handlePackChange = (event) => {
        data.packConvention = event
    };

    const handlePartnerChange = (event) => {
        data.partnerId = event
        console.log("patenaire", data.partnerId)

    };
    const handleContactChange = (event) => {
        data.contactPartner = event
    };

    const handleStatutChange = (event) => {
        data.statutConvention = event
    };

    const handleDeviseChange = (event) => {
        data.devise = event

    };

    const handleModeChange = (event) => {
        data.modePartner = event
        console.log('mokoko:', data.modePartner)
    };

    const handleCriterSelectedChange = (event) => {
        const selectedValues = [];
        data.critereSelected = event
        setSelectedCritereSelected(selectedValues);
    };

    const handleValidateSelectedChange = (event) => {

        data.validateBeneficiary = event

    };

    const handleOpenBookChange = (event) => {
        const selectedValues = [];
        data.openBook = event
        setSelectedOpenBookSelected(selectedValues);
    };

    const handleCompteChange = (event) => {
        const selectedValues = [];
        data.accountBank = event
        //console.log( data.accountBank["value"])
        setSelectedCompteSelected(selectedValues);
    };

    const handleServiceChange = (event) => {
        data.service = event
    };



    const handleBeneficiaryChange = (event) => {
        data.typeBeneficiary = event

        //avoir 
        //console.log(data.typeBeneficiary.length)
    };

    {/* const handleTypeCritereBeneficiaryChange = (event) => {
        const selectedValues = [];
        data.typeCritereBeneficiary = event
        setSelectedTypeCritereBeneficiary(selectedValues);
    };*/}

    const handleModelReportingChange = (event) => {
        data.modelReporting = event

    };
    //pour la partie des critères
    const handleRegionChange = (event) => {
        data.region = event
    };
    const handleProvinceChange = (event) => {
        data.province = event
    };
    const handleVilleChange = (event) => {
        data.ville = event
    };
    const handleGenreChange = (event) => {
        data.genre = event
    };
    const handleFiliereChange = (event) => {
        data.filiere = event
    };
    const handleYearChange = (event) => {
        data.year = event
    };
    const handleSituationChange = (event) => {
        data.situation = event
    };
    const handleHandicapChange = (event) => {
        data.handicap = event
    };
    const handleEPSChange = (event) => {
        data.eps = event
    };
    const handleLogementChange = (event) => {
        data.logement = event
    };
    const handleOrphelinChange = (event) => {
        data.orphelin = event
    };
    const handlePriseChargeChange = (event) => {
        data.priseCharge = event
    };


    const submit = (e) => {
        e.preventDefault();
        post(route('dashboard.convention-update.store',convention.id), {

        })
    }

    return (
        <DefaultLayout>
            <div>
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-bold text-lg dark:text-white-light">Modification d'une convention</h5>
                </div>
                <form onSubmit={submit}>
                    <div className="datatables mb-4">
                        <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
                            <div className=" sm:w-full">
                                <div className="panel">
                                    <h2 className="text-lg mb-3 ">Information sur la convention</h2>

                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="my-2 custom-select">
                                            <label htmlFor="newConvention" className="text-base">Nouvelle convention <span className='text-danger'>*</span></label>
                                            <Select onChange={handleNewConventionChange} defaultValue={data.newConvention} options={optionNewConvention} isSearchable={false} />
                                            {errors.newConvention && <div className="text-danger">{errors.newConvention}</div>}
                                        </div>
                                    </div>
                                    {
                                        data.newConvention["value"] == "Non" ?
                                            <>
                                                <div className="grid grid-cols-1 gap-3">
                                                    <div className="my-2">
                                                        <label htmlFor="reference" className="text-base">Référence ancienne <span className='text-danger'>*</span></label>
                                                        <input type="text" value={data.reference} onChange={e => setData('reference', e.target.value)} className="form-input" placeholder="Référence ancienne" />
                                                        {errors.reference && <div className="text-danger">{errors.reference}</div>}
                                                    </div>
                                                </div>
                                            </>
                                            : null
                                    }

                                    {/*---------------------*/}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="my-2 custom-select">
                                            <label htmlFor="familleConvention" className="text-base">Famille de la convention <span className='text-danger'>*</span></label>
                                            <Select onChange={handleFamillyChange} defaultValue={data.familleConvention} options={optionFamille} isSearchable={false} />
                                            {errors.familleConvention && <div className="text-danger">{errors.familleConvention}</div>}
                                        </div>
                                        <div className="my-2 custom-select">
                                            <label htmlFor="packConvention" className="text-base">Choisir le pack de la convention</label>
                                            <Select onChange={handlePackChange} defaultValue={data.packConvention} options={optionPack} isSearchable={false} />
                                            {errors.packConvention && <div className="text-danger">{errors.packConvention}</div>}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="datatables mb-4">
                        <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
                            <div className="md:w-4/5 sm:w-full">
                                <div className="panel">
                                    <h2 className="text-lg mb-3">Information sur le partenaire </h2>
                                    <div className="grid gap-3">
                                        <div className="my-2">
                                            <label htmlFor="name" className="text-base">Nombre de partenaire <span className='text-danger'>*</span></label>
                                            <input type="number" min={1} max={1} value={data.numberPartner} onChange={e => setData('numberPartner', e.target.value)} className="form-input" placeholder="Nombre de partenaire" />
                                            {errors.numberPartner && <div className="text-danger">{errors.numberPartner}</div>}
                                        </div>
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="my-2 custom-select">
                                            <label htmlFor="partnerId" className="text-base">Choix du partenaire <span className='text-danger'>*</span></label>
                                            <Select onChange={handlePartnerChange} defaultValue={data.partnerId} options={optionPartner} isSearchable={false} />
                                            {errors.partnerId && <div className="text-danger">{errors.partnerId}</div>}
                                        </div>
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="my-2 custom-select">
                                            <label htmlFor="contactPartner" className="text-base">Personne focal chez le partenaire <span className='text-danger'>*</span> </label>
                                            <Select onChange={handleContactChange} defaultValue={data.contactPartner} options={optionContact} isSearchable={true} />
                                            {errors.contactPartner && <div className="text-danger">{errors.contactPartner}</div>}
                                        </div>
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="my-2 custom-select">
                                            <label htmlFor="statutConvention" className="text-base">Statut de la convention <span className='text-danger'>*</span></label>
                                            <Select onChange={handleStatutChange} defaultValue={data.statutConvention} options={optionStatut} isSearchable={false} />
                                            {errors.statutConvention && <div className="text-danger">{errors.statutConvention}</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-3/5 sm:w-full">
                                <div className="panel">
                                    <h2 className="text-lg mb-3">Information sur la durée </h2>
                                    <div className="grid gap-3">
                                        <div className="my-2">
                                            <label htmlFor="dateSignature" className="text-base">Date de signature <span className='text-danger'>*</span></label>
                                            <input type="date" value={data.dateSignature} onChange={e => setData('dateSignature', e.target.value)} className="form-input" placeholder="Type de bénéficiaire" />
                                            {errors.dateSignature && <div className="text-danger">{errors.dateSignature}</div>}
                                        </div>
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="my-2">
                                            <label htmlFor="dureeConvention" className="text-base">Durée de la convention <span className='text-danger'>*</span></label>
                                            <input type="text" value={data.dureeConvention.toUpperCase()} onChange={handleFamillyChange} className="form-input disabled:pointer-events-none disabled:bg-success text-white dark:disabled:bg-[#1b2e4b] cursor-not-allowed" disabled readOnly />
                                            {errors.dureeConvention && <div className="text-danger">{errors.dureeConvention}</div>}
                                        </div>
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="my-2">
                                            <label htmlFor="dureeConvention" className="text-base">Type de convention <span className='text-danger'>*</span></label>
                                            <input type="text" value={data.typeConvention.toUpperCase()} onChange={handleFamillyChange} className="form-input disabled:pointer-events-none disabled:bg-secondary text-white dark:disabled:bg-[#1b2e4b] cursor-not-allowed" disabled readOnly />
                                            {errors.dureeConvention && <div className="text-danger">{errors.dureeConvention}</div>}
                                        </div>
                                    </div>
                                    {/**Premier condition PLURI-COHORTE*/}
                                    {data.dureeConvention.toUpperCase() == "PLURI-COHORTE" ?
                                        <>
                                            <div className="grid gap-3">
                                                <div className="my-2">
                                                    <label htmlFor="dureeEnAnnee" className="text-base">Durée en année <span className='text-danger'>*</span></label>
                                                    <input type="number" min={1} max={10} value={data.dureeEnAnnee} onChange={e => setData('dureeEnAnnee', e.target.value)} className="form-input" placeholder='Durée en année' />
                                                    {errors.dureeEnAnnee && <div className="text-danger">{errors.dureeEnAnnee}</div>}
                                                </div>
                                            </div>
                                            <div className="grid gap-3">
                                                <div className="my-2">
                                                    <label htmlFor="numberCohorte" className="text-base">Nombre de cohorte <span className='text-danger'>*</span></label>
                                                    <input type="number" min={1} max={100} value={data.numberCohorte} onChange={e => setData('numberCohorte', e.target.value)} className="form-input" placeholder='Nombre de cohorte' />
                                                    {errors.numberCohorte && <div className="text-danger">{errors.numberCohorte}</div>}
                                                </div>
                                            </div>
                                        </>
                                        : null
                                    }
                                    {/**deuxieme condition */}
                                    {
                                        data.dureeConvention.toUpperCase() == "MONO-COHORTE FERME" ?
                                            <div className="grid gap-3">
                                                <div className="my-2">
                                                    <label htmlFor="dureeEnAnnee" className="text-base">Durée en année <span className='text-danger'>*</span></label>
                                                    <input type="number" min={1} max={10} value={data.dureeEnAnnee} onChange={e => setData('dureeEnAnnee', e.target.value)} className="form-input" placeholder='Durée en année' />
                                                    {errors.dureeEnAnnee && <div className="text-danger">{errors.dureeEnAnnee}</div>}
                                                </div>
                                            </div>
                                            : null
                                    }



                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        data.typeConvention.toUpperCase() == "ECRITE" ?
                            <>
                                <div className="datatables mb-4">
                                    <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
                                        <div className=" sm:w-full">
                                            <div className="panel">
                                                <h2 className="text-lg mb-3 ">Les fichiers rattachés à la convention</h2>
                                                <div className="grid grid-cols-3 gap-3">
                                                    <div className="my-2">
                                                        <label htmlFor="fileConvention" className="text-base">Document de la convention <span className='text-danger'>*</span></label>
                                                        <input type="file" onChange={e => setData('fileConvention', e.target.files[0])} accept="file/PDF, file/pdf" className="form-input" />
                                                        {errors.fileConvention && <div className="text-danger">{errors.fileConvention}</div>}
                                                        {
                                                            data.fileConvention!=""?
                                                            <p className='text-blue-600/100'>Le fichier rattaché à cette convention 
                                                            est déjà chargé si vous voulez le modifier, charger un autre au cas contraire il est déjà conservé.  </p>:null                                                        }
                                                    </div>
                                                    <div className="my-2">
                                                        <label htmlFor="dateEffetFile" className="text-base">Date d'effet du document <span className='text-danger'>*</span></label>
                                                        <input type="date" value={data.dateEffetFile} onChange={e => setData('dateEffetFile', e.target.value)} className="form-input" />
                                                        {errors.dateEffetFile && <div className="text-danger">{errors.dateEffetFile}</div>}
                                                    </div>
                                                    <div className="my-2">
                                                        <label htmlFor="dateFinFile" className="text-base">Date de fin u document <span className='text-danger'>*</span></label>
                                                        <input type="date" value={data.dateFinFile} onChange={e => setData('dateFinFile', e.target.value)} className="form-input" />
                                                        {errors.dateFinFile && <div className="text-danger">{errors.dateFinFile}</div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            : null
                    }
                    {
                        data.typeConvention.toUpperCase() == "PACK" ?
                            <>
                                <div className="datatables mb-4">
                                    <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
                                        <div className=" sm:w-full">
                                            <div className="panel">
                                                <h2 className="text-lg mb-3 ">Les fichiers rattachés à la convention</h2>
                                                <div className="grid grid-cols-3 gap-3">
                                                    <div className="my-2">
                                                        <label htmlFor="fileConvention" className="text-base">Document de la convention <span className='text-danger'>*</span></label>
                                                        <input type="file" onChange={e => setData('fileConvention', e.target.files[0])} accept="file/PDF, file/pdf" className="form-input" />
                                                        {errors.fileConvention && <div className="text-danger">{errors.fileConvention}</div>}
                                                    </div>
                                                    <div className="my-2">
                                                        <label htmlFor="dateEffetFile" className="text-base">Date d'effet du document <span className='text-danger'>*</span></label>
                                                        <input type="date" value={data.dateEffetFile} onChange={e => setData('dateEffetFile', e.target.value)} className="form-input" />
                                                        {errors.dateEffetFile && <div className="text-danger">{errors.dateEffetFile}</div>}
                                                    </div>
                                                    <div className="my-2">
                                                        <label htmlFor="dateFinFile" className="text-base">Date de fin u document <span className='text-danger'>*</span></label>
                                                        <input type="date" value={data.dateFinFile} onChange={e => setData('dateFinFile', e.target.value)} className="form-input" />
                                                        {errors.dateFinFile && <div className="text-danger">{errors.dateFinFile}</div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            : null
                    }
                    <div className="datatables mb-4">
                        <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
                            <div className=" sm:w-full">
                                <div className="panel">
                                    <h2 className="text-lg mb-3 ">Information sur périodicité</h2>
                                    {/**Premier condition PLURI-COHORTE*/}
                                    {data.dureeConvention.toUpperCase() == "PLURI-COHORTE" ?
                                        <>
                                            <div className="grid grid-cols-3 gap-3">
                                                <div className="my-2">
                                                    <label htmlFor="dureeAccompagnement" className="text-base">Durée d'accompagnement  <span className='text-danger'>*</span></label>
                                                    <input type="number" min={1} value={data.dureeAccompagnement} onChange={e => setData('dureeAccompagnement', e.target.value)} className="form-input" placeholder="Durée d'accompagnement en cohorte" />
                                                    {errors.dureeAccompagnement && <div className="text-danger">{errors.dureeAccompagnement}</div>}
                                                </div>
                                                <div className="my-2">
                                                    <label htmlFor="numberBeneficiary" className="text-base">Nombre de bénéficiaire total <span className='text-danger'>*</span></label>
                                                    <input type="number" min={1} value={data.numberBeneficiary} onChange={e => setData('numberBeneficiary', e.target.value)} className="form-input" placeholder='Nombre de bénéficiaire total' />
                                                    {errors.numberBeneficiary && <div className="text-danger">{errors.numberBeneficiary}</div>}
                                                </div>
                                                <div className="my-2">
                                                    <label htmlFor="numberBeneficiaryMax" className="text-base">Nombre de bénéficaire maximum <span className='text-danger'>*</span></label>
                                                    <input type="number" min={1} value={data.numberBeneficiaryMax} onChange={e => setData('numberBeneficiaryMax', e.target.value)} className="form-input" placeholder='Nombre de bénéficaire maximum par an' />
                                                    {errors.numberBeneficiaryMax && <div className="text-danger">{errors.numberBeneficiaryMax}</div>}
                                                </div>
                                            </div>
                                        </>
                                        : null}
                                    {/**deuxieme condition */}
                                    {
                                        data.dureeConvention.toUpperCase() == "MONO-COHORTE FERME" ?
                                            <>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="my-2">
                                                        <label htmlFor="numberBeneficiary" className="text-base">Nombre de bénéficiaire de la cohorte <span className='text-danger'>*</span></label>
                                                        <input type="number" min={1} value={data.numberBeneficiary} onChange={e => setData('numberBeneficiary', e.target.value)} className="form-input" placeholder='Nombre de bénéficiaire de la cohorte' />
                                                        {errors.numberBeneficiary && <div className="text-danger">{errors.numberBeneficiary}</div>}
                                                    </div>
                                                    <div className="my-2">
                                                        <label htmlFor="periodeAccompagnement" className="text-base">Période d'accompagnement <span className='text-danger'>*</span></label>
                                                        <input min={1} type="number" value={data.periodeAccompagnement} onChange={e => setData('periodeAccompagnement', e.target.value)} className="form-input" placeholder="Période d'accompagnement" />
                                                        {errors.periodeAccompagnement && <div className="text-danger">{errors.periodeAccompagnement}</div>}
                                                    </div>
                                                </div>
                                            </>
                                            : null

                                    }
                                    {/**troisieme condition */}
                                    {
                                        data.dureeConvention.toUpperCase() == "ANNUELLE RENOUVELABLE" ?
                                            <>
                                                <div className="grid grid-cols-3 gap-3">
                                                    <div className="my-2">
                                                        <label htmlFor="preavis" className="text-base">Préavis <span className='text-danger'>*</span></label>
                                                        <input type="number" min={1} value={data.preavis} onChange={e => setData('preavis', e.target.value)} className="form-input" placeholder='Préavis' />
                                                        {errors.preavis && <div className="text-danger">{errors.preavis}</div>}
                                                    </div>
                                                    <div className="my-2">
                                                        <label htmlFor="echeance" className="text-base">Echéance de la convention <span className='text-danger'>*</span></label>
                                                        <input type="date" value={data.echeance} onChange={e => setData('echeance', e.target.value)} className="form-input" placeholder='Nombre de cohorte' />
                                                        {errors.echeance && <div className="text-danger">{errors.echeance}</div>}
                                                    </div>
                                                    <div className="my-2">
                                                        <label htmlFor="numberBeneficiaryMax" className="text-base">Nombre de bénéficaire maximum<span className='text-danger'>*</span></label>
                                                        <input type="number" value={data.numberBeneficiaryMax} onChange={e => setData('numberBeneficiaryMax', e.target.value)} className="form-input" placeholder='Nombre de bénéficaire maximum par an' />
                                                        {errors.numberBeneficiaryMax && <div className="text-danger">{errors.numberBeneficiaryMax}</div>}
                                                    </div>

                                                </div>
                                            </>
                                            : null
                                    }
                                    {/**quatrieme condition */}
                                    {
                                        data.dureeConvention.toUpperCase() == "ANNUELLE FERME" ?
                                            <>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="my-2">
                                                        <label htmlFor="echeance" className="text-base">Echéance de la convention <span className='text-danger'>*</span></label>
                                                        <input type="date" value={data.echeance} onChange={e => setData('echeance', e.target.value)} className="form-input" />
                                                        {errors.echeance && <div className="text-danger">{errors.echeance}</div>}
                                                    </div>
                                                    <div className="my-2">
                                                        <label htmlFor="numberBeneficiaryMax" className="text-base">Nombre de bénéficaire maximum par an <span className='text-danger'>*</span></label>
                                                        <input type="number" value={data.numberBeneficiaryMax} onChange={e => setData('numberBeneficiaryMax', e.target.value)} className="form-input" placeholder='Nombre de bénéficaire maximum par an' />
                                                        {errors.numberBeneficiaryMax && <div className="text-danger">{errors.numberBeneficiaryMax}</div>}
                                                    </div>
                                                </div>
                                            </>
                                            : null
                                    }
                                    {/**cinquime condition */}
                                    {
                                        data.dureeConvention.toUpperCase() == "OUVERTE" ?
                                            <>
                                                <div className="grid grid-cols-1 gap-3">
                                                    <div className="my-2">
                                                        <label htmlFor="echeance" className="text-base">Echéance de la convention <span className='text-danger'>*</span></label>
                                                        <input type="date" value={data.echeance} onChange={e => setData('echeance', e.target.value)} className="form-input" />
                                                        {errors.echeance && <div className="text-danger">{errors.echeance}</div>}
                                                    </div>
                                                </div>
                                            </>
                                            : null
                                    }


                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="my-2">
                                            <label htmlFor="dateEffet" className="text-base">Date d'effet <span className='text-danger'>*</span></label>
                                            <input type="date" value={data.dateEffet} onChange={e => setData('dateEffet', e.target.value)} className="form-input" placeholder="Date d'effet" />
                                            {errors.dateEffet && <div className="text-danger">{errors.dateEffet}</div>}
                                        </div>
                                        <div className="my-2">
                                            <label htmlFor="dateFin" className="text-base">Date fin <span className='text-danger'>*</span></label>
                                            <input type="date" value={data.dateFin} onChange={e => setData('dateFin', e.target.value)} className="form-input" placeholder='Date fin' />
                                            {errors.dateFin && <div className="text-danger">{errors.dateFin}</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="datatables mb-4">
                        <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
                            <div className="md:w-4/3 sm:w-full">
                                <div className="panel">
                                    <h2 className="text-lg mb-3">Information  tarifaires </h2>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="my-2">
                                            <label htmlFor="montantGlobal" className="text-base">Montant global de la convention <span className='text-danger'>*</span></label>
                                            <input type="text" value={data.montantGlobal} onChange={e => setData('montantGlobal', e.target.value)} className="form-input" placeholder="Montant global de la convention" />
                                            {errors.montantGlobal && <div className="text-danger">{errors.montantGlobal}</div>}
                                        </div>
                                        <div className="my-2 custom-select">
                                            <label htmlFor="devise" className="text-base">Devise de la convention  <span className='text-danger'>*</span></label>
                                            <Select onChange={handleDeviseChange} defaultValue={data.devise} options={optionDevise} isSearchable={false} />
                                            {errors.devise && <div className="text-danger">{errors.devise}</div>}
                                        </div>
                                    </div>
                                    <div className="grid  gap-3">
                                        <div className="my-2">
                                            <label htmlFor="contributionPartnaire" className="text-base">Contribution du partenaire <span className='text-danger'>*</span></label>
                                            <input type="number" min={1} value={data.contributionPartnaire} onChange={e => setData('contributionPartnaire', e.target.value)} className="form-input" placeholder="Contribution du partenaire" />
                                            {errors.contributionPartnaire && <div className="text-danger">{errors.contributionPartnaire}</div>}
                                        </div>
                                    </div>
                                    <div className="grid  gap-3">
                                        <div className="my-2">
                                            <label htmlFor="echeancierReglement" className="text-base">Echéancier du réglement du partenaire <span className='text-danger'>*</span></label>
                                            <input type="number" min={1} value={data.echeancierReglement} onChange={e => setData('echeancierReglement', e.target.value)} className="form-input" placeholder="Echéancier du réglement du partenaire" />
                                            {errors.echeancierReglement && <div className="text-danger">{errors.echeancierReglement}</div>}
                                        </div>
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="my-2">
                                            <label htmlFor="dateEcheanceReglement" className="text-base">Date d'échéance du réglement <span className='text-danger'>*</span></label>
                                            <input type="date" value={data.dateEcheanceReglement} onChange={e => setData('dateEcheanceReglement', e.target.value)} className="form-input" />
                                            {errors.dateEcheanceReglement && <div className="text-danger">{errors.dateEcheanceReglement}</div>}
                                        </div>
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="my-2">
                                            <label htmlFor="montantReglement" className="text-base">Montant du réglement <span className='text-danger'>*</span></label>
                                            <input type="text" value={data.montantReglement} onChange={e => setData('montantReglement', e.target.value)} className="form-input" placeholder="Montant du réglement" />
                                            {errors.montantReglement && <div className="text-danger">{errors.montantReglement}</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-3/5 sm:w-full">
                                <div className="panel">
                                    <h2 className="text-lg mb-3">Information  tarifaires</h2>
                                    <div className="grid gap-3">
                                        <div className="my-2">
                                            <label htmlFor="dateLimiteSelection" className="text-base">Date limite pour sélection prochaine cohorte <span className='text-danger'>*</span></label>
                                            <input type="date" value={data.dateLimiteSelection} onChange={e => setData('dateLimiteSelection', e.target.value)} className="form-input" />
                                            {errors.dateLimiteSelection && <div className="text-danger">{errors.dateLimiteSelection}</div>}
                                        </div>
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="my-2">
                                            <label htmlFor="numberBeneficiaryNextCohort" className="text-base">Nombre de bénéficiaire prochaine cohorte <span className='text-danger'>*</span></label>
                                            <input type="number" min={1} value={data.numberBeneficiaryNextCohort} onChange={e => setData('numberBeneficiaryNextCohort', e.target.value)} className="form-input" placeholder="Nombre de bénéficiaire prochaine cohorte" />
                                            {errors.numberBeneficiaryNextCohort && <div className="text-danger">{errors.numberBeneficiaryNextCohort}</div>}
                                        </div>
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="my-2 custom-select">
                                            <label htmlFor="modePartner" className="text-base">Marque Partenaire <span className='text-danger'>*</span></label>
                                            <Select onChange={handleModeChange} defaultValue={data.modePartner} options={optionModePartner} isSearchable={false} />
                                            {errors.modePartner && <div className="text-danger">{errors.modePartner}</div>}
                                        </div>
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="my-2 custom-select">
                                            <label htmlFor="critereSelected" className="text-base">Critère de sélection <span className='text-danger'>*</span></label>
                                            <Select onChange={handleCriterSelectedChange} defaultValue={data.critereSelected} options={optionCritereSelected} isSearchable={false} />
                                            {errors.critereSelected && <div className="text-danger">{errors.critereSelected}</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        data.critereSelected["value"] == "Oui" ?
                            <>
                                <div className="datatables mb-4">
                                    <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
                                        <div className=" sm:w-full">
                                            <div className="panel">
                                                <h2 className="text-lg mb-3 ">Validation des critères</h2>
                                                <div className="grid grid-cols-1 gap-3">
                                                    <div className="my-2 custom-select">
                                                        <label htmlFor="typeBeneficiary" className="text-base">Choix des bénéficiaires </label>
                                                        <Select options={optionBeneficiary} multiple={true} onChange={handleBeneficiaryChange} type="text" isMulti isSearchable={false} defaultValue={data.typeBeneficiary} placeholder="Sélectionner....." readOnly />
                                                        {errors.typeBeneficiary && <div className="text-danger">{errors.typeBeneficiary}</div>}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-3 gap-3">
                                                    <div className="my-2 custom-select">
                                                        <label htmlFor="region" className="text-base">Région </label>
                                                        <Select options={optionRegion} multiple={true} onChange={handleRegionChange} type="text" isMulti isSearchable={true} defaultValue={data.region} placeholder="Sélectionner....." />
                                                        {errors.region && <div className="text-danger">{errors.region}</div>}
                                                    </div>
                                                    <div className="my-2 custom-select">
                                                        <label htmlFor="province" className="text-base">Province </label>
                                                        <Select options={optionProvince} multiple={true} onChange={handleProvinceChange} type="text" isMulti isSearchable={true} defaultValue={data.province} placeholder="Sélectionner....." />
                                                        {errors.province && <div className="text-danger">{errors.province}</div>}
                                                    </div>
                                                    <div className="my-2 custom-select">
                                                        <label htmlFor="ville" className="text-base">Ville </label>
                                                        <Select options={optionVille} multiple={true} onChange={handleVilleChange} type="text" isMulti isSearchable={true} defaultValue={data.ville} placeholder="Sélectionner....." />
                                                        {errors.ville && <div className="text-danger">{errors.ville}</div>}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-3 gap-3">
                                                    <div className="my-2 custom-select">
                                                        <label htmlFor="genre" className="text-base">Genre </label>
                                                        <Select options={optionGenre} multiple={true} onChange={handleGenreChange} type="text" isMulti isSearchable={false} defaultValue={data.genre} placeholder="Sélectionner....." readOnly />
                                                        {errors.genre && <div className="text-danger">{errors.genre}</div>}
                                                    </div>
                                                    <div className="my-2">
                                                        <label htmlFor="noteBacRegional" className="text-base">Note du Bac régional </label>
                                                        <input type="number" min={1} max={20} value={data.noteBacRegional} onChange={e => setData('noteBacRegional', e.target.value)} className="form-input" placeholder="Nombre de bénéficiaire prochaine cohorte" />
                                                        {errors.noteBacRegional && <div className="text-danger">{errors.noteBacRegional}</div>}
                                                    </div>
                                                    <div className="my-2">
                                                        <label htmlFor="noteSemestre" className="text-base">Note du premier semestre </label>
                                                        <input type="number" min={1} value={data.noteSemestre} onChange={e => setData('noteSemestre', e.target.value)} className="form-input" placeholder="Nombre de bénéficiaire prochaine cohorte" />
                                                        {errors.noteSemestre && <div className="text-danger">{errors.noteSemestre}</div>}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-3 gap-3">
                                                    <div className="my-2 custom-select">
                                                        <label htmlFor="filiere" className="text-base">Filière du Bac </label>
                                                        <Select options={optionFiliere} multiple={true} onChange={handleFiliereChange} type="text" isMulti isSearchable={true} defaultValue={data.filiere} placeholder="Sélectionner....." />
                                                        {errors.filiere && <div className="text-danger">{errors.filiere}</div>}
                                                    </div>
                                                    <div className="my-2 custom-select">
                                                        <label htmlFor="year" className="text-base">Année du Bac </label>
                                                        <Select options={optionYear} multiple={true} onChange={handleYearChange} type="text" isMulti isSearchable={true} defaultValue={data.year} placeholder="Sélectionner....." />
                                                        {errors.year && <div className="text-danger">{errors.year}</div>}
                                                    </div>
                                                    <div className="my-2 custom-select">
                                                        <label htmlFor="situation" className="text-base">Situation sociale </label>
                                                        <Select options={optionSituation} multiple={true} onChange={handleSituationChange} type="text" isMulti isSearchable={true} defaultValue={data.situation} placeholder="Sélectionner....." readOnly />
                                                        {errors.situation && <div className="text-danger">{errors.situation}</div>}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-3 gap-3">
                                                    <div className="my-2 custom-select">
                                                        <label htmlFor="handicap" className="text-base">Situation d'handicap </label>
                                                        <Select options={optionHandicap} multiple={true} onChange={handleHandicapChange} type="text" isMulti isSearchable={true} defaultValue={data.handicap} placeholder="Sélectionner....." readOnly />
                                                        {errors.handicap && <div className="text-danger">{errors.handicap}</div>}
                                                    </div>
                                                    <div className="my-2 custom-select">
                                                        <label htmlFor="eps" className="text-base">Prise en charge par un EPS </label>
                                                        <Select options={optionEPS} multiple={true} onChange={handleEPSChange} type="text" isMulti isSearchable={false} defaultValue={data.eps} placeholder="Sélectionner....." readOnly />
                                                        {errors.eps && <div className="text-danger">{errors.eps}</div>}
                                                    </div>
                                                    <div className="my-2 custom-select">
                                                        <label htmlFor="logement" className="text-base">Type logement </label>
                                                        <Select options={optionLogement} multiple={true} onChange={handleLogementChange} type="text" isMulti isSearchable={false} defaultValue={data.logement} placeholder="Sélectionner....." readOnly />
                                                        {errors.logement && <div className="text-danger">{errors.logement}</div>}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-3 gap-3">
                                                    <div className="my-2 custom-select">
                                                        <label htmlFor="orphelin" className="text-base">Type d'orphelin </label>
                                                        <Select options={optionOrphelin} multiple={true} onChange={handleOrphelinChange} type="text" isMulti isSearchable={false} defaultValue={data.orphelin} placeholder="Sélectionner....." />
                                                        {errors.orphelin && <div className="text-danger">{errors.orphelin}</div>}
                                                    </div>
                                                    <div className="my-2 custom-select">
                                                        <label htmlFor="priseCharge" className="text-base">Prise en charge par lequel des parents </label>
                                                        <Select options={optionPriseCharge} multiple={true} onChange={handlePriseChargeChange} type="text" isMulti isSearchable={false} defaultValue={data.priseCharge} placeholder="Sélectionner....." />
                                                        {errors.priseCharge && <div className="text-danger">{errors.priseCharge}</div>}
                                                    </div>
                                                    <div className="my-2">
                                                        <label htmlFor="montantPension" className="text-base">Le montant de la pension  </label>
                                                        <input type="number" min={1} value={data.montantPension} onChange={e => setData('montantPension', e.target.value)} className="form-input" placeholder="Montant de la pension" />
                                                        {errors.montantPension && <div className="text-danger">{errors.montantPension}</div>}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="my-2">
                                                        <label htmlFor="revenu" className="text-base">Revenu mensuel des parents </label>
                                                        <input type="number" min={1} value={data.revenu} onChange={e => setData('revenu', e.target.value)} className="form-input" placeholder="Revenu mensuel des parents" />
                                                        {errors.revenu && <div className="text-danger">{errors.revenu}</div>}
                                                    </div>
                                                    <div className="my-2">
                                                        <label htmlFor="nbreFrSr" className="text-base">Nombre de frères et soeurs  </label>
                                                        <input type="number" min={1} value={data.nbreFrSr} onChange={e => setData('nbreFrSr', e.target.value)} className="form-input" placeholder="Nombre de frères et soeurs" />
                                                        {errors.nbreFrSr && <div className="text-danger">{errors.nbreFrSr}</div>}
                                                    </div>
                                                </div>
                                                {/*
                                    {
                                        data.typeBeneficiary.map((item,index) => (
                                            <div key={item.key}>
                                            <div className="grid grid-cols-1 gap-3">
                                                <div className="my-2">
                                                    <label htmlFor="typeCritereBeneficiary" className="text-base">Critère de sélection pour le choix {(item.value).toLowerCase()} <span className='text-danger'>*</span></label>
                                                    <Select value={data.typeCritereBeneficiary} options={optionCritereService} multiple={true} onChange={handleTypeCritereBeneficiaryChange} type="text" isMulti isSearchable={false}  defaultValue=""    placeholder="Sélectionner....." readOnly/>
                                                    {errors.typeCritereBeneficiary && <div className="text-danger">{errors.typeCritereBeneficiary}</div>}
                                                </div>
                                            </div>
                                            </div>
                                           
                                        
                                      ))
                                      }
                                    */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            : null
                    }

                    <div className="datatables mb-4">
                        <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
                            <div className=" sm:w-full">
                                <div className="panel">
                                    <h2 className="text-lg mb-3 ">Information sur la convention</h2>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="my-2  custom-select">
                                            <label htmlFor="validateBeneficiary" className="text-base">Validation des bénéficiaires par partenaire <span className='text-danger'>*</span></label>
                                            <Select onChange={handleValidateSelectedChange} defaultValue={data.validateBeneficiary} options={optionValidateSelected} isSearchable={false} />
                                            {errors.validateBeneficiary && <div className="text-danger">{errors.validateBeneficiary}</div>}
                                        </div>
                                        <div className="my-2 custom-select">
                                            <label htmlFor="openBook" className="text-base">Open book <span className='text-danger'>*</span></label>
                                            <Select onChange={handleOpenBookChange} defaultValue={data.openBook} options={optionOpenBook} isSearchable={false} />
                                            {errors.openBook && <div className="text-danger">{errors.openBook}</div>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="my-2 custom-select">
                                            <label htmlFor="accountBank" className="text-base">Compte bancaire <span className='text-danger'>*</span></label>
                                            <Select onChange={handleCompteChange} defaultValue={data.accountBank} options={optionCompte} isSearchable={false} />
                                            {errors.accountBank && <div className="text-danger">{errors.accountBank}</div>}
                                        </div>
                                    </div>
                                    {
                                        data.accountBank["value"] == "Oui" ?
                                            <>
                                                <div className="grid grid-cols-1 gap-3">
                                                    <div className="my-2">
                                                        <label htmlFor="ribConvention" className="text-base">Renseigner le RIB pour cette convention <span className='text-danger'>*</span></label>
                                                        <input type="text" value={data.ribConvention} onChange={e => setData('ribConvention', e.target.value)} className="form-input" placeholder='Renseigner le RIB' />
                                                        {errors.ribConvention && <div className="text-danger">{errors.ribConvention}</div>}
                                                    </div>
                                                </div>
                                            </>
                                            : null
                                    }
                                    {
                                        data.openBook["value"] == "Oui" ?
                                            <>
                                                <div className="grid grid-cols-1 gap-3">
                                                    <div className="my-2 custom-select">
                                                        <label htmlFor="modelReporting" className="text-base">Choisir les modèles de reporting <span className='text-danger'>*</span></label>
                                                        <Select options={optionModelReporting} multiple={true} onChange={handleModelReportingChange} type="text" isMulti isSearchable={false} defaultValue={data.modelReporting} placeholder="Sélectionner....." />
                                                        {errors.modelReporting && <div className="text-danger">{errors.modelReporting}</div>}
                                                    </div>
                                                </div>
                                            </>
                                            : null
                                    }

                                    {/*---------------------*/}
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="my-2 custom-select">
                                            <label htmlFor="service" className="text-base">Services assurés <span className='text-danger'>*</span></label>
                                            <Select options={optionService} multiple={true} onChange={handleServiceChange} type="text" isMulti isSearchable={false} defaultValue={data.service} placeholder="Sélectionner....." />
                                            {errors.service && <div className="text-danger">{errors.service}</div>}
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="panel mb-4">
                        <div className="grid  gap-3 pt-4">
                            <div className="my-2">
                                        <button type="submit" className="btn btn-success">
                                            <FiSave className="mr-4 rtl:order-2" />
                                            <span>Valider la convontion</span>
                                        </button>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    )
}
