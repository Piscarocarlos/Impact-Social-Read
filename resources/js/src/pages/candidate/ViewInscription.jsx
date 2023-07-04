import React from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'

const ViewInscription = ({ myInscription, regions, provinces, cities }) => {
    const dataForms = JSON.parse(myInscription?.dataForm)
    console.log(myInscription?.dataForm);

    const filteredElement = (data, id) => data?.find(element => element.id === id);
    return (
        <DefaultLayout>
            <div className=''>
                {(myInscription.etat == 0 || myInscription.etat == null) ?
               <div className="panel">
              <div className="relative flex items-center border p-3.5 rounded text-warning bg-warning-light border-warning ltr:border-l-[64px] rtl:border-r-[64px] dark:bg-success-dark-light">
              <span className="absolute ltr:-left-11 rtl:-right-11 inset-y-0 text-white w-6 h-6 m-auto">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                          opacity="0.5"
                          d="M5.31171 10.7615C8.23007 5.58716 9.68925 3 12 3C14.3107 3 15.7699 5.58716 18.6883 10.7615L19.0519 11.4063C21.4771 15.7061 22.6897 17.856 21.5937 19.428C20.4978 21 17.7864 21 12.3637 21H11.6363C6.21356 21 3.50217 21 2.40626 19.428C1.31034 17.856 2.52291 15.7061 4.94805 11.4063L5.31171 10.7615Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                      />
                      <path d="M12 8V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="12" cy="16" r="1" fill="currentColor" />
                  </svg>
              </span>
              <span className="ltr:pr-2 rtl:pl-2">
              <strong className="ltr:mr-1 rtl:ml-1">Merci, votre candidature est en attente de finalisation. Veuillez finir votre inscription ! </strong>
              </span>
        
          </div>
          </div>
                    :
                    <div className="view-myCandidature">
                        <div className="information-personnelle panel mb-5">
                            <h2 className='text-4xl md:text-lg mb-5'>Informations Personnelles</h2>
                            <div className="flex justify-around  ">


                                <ul className="list-disc">
                                    <li><span>Nom :</span> <span>{dataForms.name}</span> </li>
                                    <li><span>Prénom :</span> <span>{dataForms.lastName}</span> </li>
                                    <li><span>Email :</span> <span>{dataForms.emailAddress}</span> </li>
                                    <li><span>GSM :</span> <span>{dataForms.gsm}</span> </li>
                                    <li><span>Genre :</span> <span>{dataForms.genre}</span> </li>
                                    <li><span>Date de naissance :</span> <span>{dataForms.dateOfBirth}</span> </li>
                                    <li><span>Lieu de naissance:</span> <span>{dataForms.placeOfBirth}</span> </li>
                                    <li><span>Code massar:</span> <span>{dataForms.massarCode}</span> </li>
                                </ul>
                                <ul className="list-disc">
                                    <li><span>CIN :</span> <span>{dataForms.numberCin}</span> </li>
                                    <li><span>Pays :</span> <span>{dataForms.country}</span> </li>
                                    <li><span>région d'origine :</span> <span>{filteredElement(regions, +dataForms.regionOfOrigin).name_region}</span> </li>
                                    <li><span>Province d'origine :</span> <span>{filteredElement(provinces, +dataForms.provinceOfOrigin).name_province}</span> </li>
                                    <li><span>Ville d'origine:</span> <span>{dataForms.cityOfOrigin}</span> </li>
                                    <li><span>Code Postal :</span> <span>{dataForms.address}</span> </li>
                                    {dataForms.neighborhood && <li><span>Quartier :</span> <span>{dataForms.neighborhood}</span> </li>}
                                    {dataForms.douar && <li><span>Douar :</span> <span>{dataForms.douar}</span> </li>}
                                    {/* {dataForms.map((item,keys)=>(<li key={keys} ></li>))} */}
                                </ul>
                            </div>

                        </div>
                        <div className="information-personnelle panel mb-5">
                            <h2 className='text-4xl md:text-lg mb-5'>Informations scolaires</h2>
                            <div className="flex justify-around  ">


                                <ul className="list-disc">
                                    <li><span>Année du bac :</span> <span>{dataForms.yearBac}</span> </li>
                                    <li><span>Ville du lycée :</span> <span>{dataForms.schoolCity}</span> </li>
                                    <li><span>Nom du lycée :</span> <span>{dataForms.schoolName}</span> </li>
                                    <li><span>Filiere :</span> <span>{dataForms.bacStream}</span> </li>

                                </ul>
                                <ul className="list-disc">

                                    <li><span>Région du lycée :</span> <span>{filteredElement(regions, +dataForms.schoolRegion).name_region}</span> </li>
                                    <li><span>Province du lycée :</span> <span>{filteredElement(provinces, +dataForms.schoolProvince).name_province}</span> </li>
                                    {dataForms.regionalBacScore && <li><span>Note bac  régional :</span> <span>{dataForms.regionalBacScore}</span> </li>}
                                    {dataForms.firstSemesterGrade && <li><span>Note premier semestre :</span> <span>{dataForms.firstSemesterGrade}</span> </li>}

                                </ul>
                            </div>

                        </div>
                        <div className="information-personnelle panel mb-5">
                            <h2 className='text-4xl md:text-lg mb-5'>Informations sur la personne à contacter en cas d'urgence</h2>
                            <div className="flex justify-around  ">


                                <ul className="list-disc">
                                    <li><span>Nom contact urgence :</span> <span>{dataForms.nameUrgency}</span> </li>
                                    <li><span>GSM d'urgence :</span> <span>{dataForms.gsmUrgency}</span> </li>

                                </ul>
                                <ul className="list-disc">

                                    <li><span>Lien de parenté :</span> <span>{dataForms.linkFamily}</span> </li>
                                    {dataForms.addressUrgency && <li><span>Adresse email urgence :</span> <span>{dataForms.addressUrgency}</span> </li>}

                                </ul>
                            </div>

                        </div>
                        <div className="information-personnelle panel mb-5">
                            <h2 className='text-4xl md:text-lg mb-5'>Informations situation personnelle</h2>
                            <div className="flex justify-around  ">


                                <ul className="list-disc">
                                    <li><span>Situation Sociale :</span> <span>{dataForms.socialSituation}</span> </li>
                                    {dataForms.orphelinType && <li><span>Vous êtes orphelin de :</span> <span>{dataForms.orphelinType === 'de pere' ? 'de père' : dataForms.orphelinType === 'de mere' ? "de mère" : dataForms.orphelinType}</span> </li>}
                                    {dataForms.parentalCare && <li><span>Prise en charge par lequel des parents  :</span> <span>{dataForms.parentalCare === 'Mon pere' ? 'Mon père' : dataForms.parentalCare === 'Ma mere' ? "Ma mère" : dataForms.parentalCare}</span> </li>}
                                    {dataForms.amountPension && <li><span>Le montant de la pension :</span> <span>{dataForms.amountPension} Dhs</span> </li>}
                                    <li><span>Vous êtes en situation d'handicap :</span> <span>{dataForms.handicapSituation === 'no' ? 'Non' : 'Oui'}</span> </li>
                                    {dataForms.handicapType && <li><span>Votre type d'handicap  :</span> <span>{dataForms.handicapType}</span> </li>}
                                    {dataForms.handicapPercentage && <li><span>le pourcentage de votre handicap  :</span> <span>{dataForms.handicapPercentage}</span> </li>}



                                </ul>
                                <ul className="list-disc">
                                    <li><span>Prise en charge par un EPS  :</span> <span>{dataForms.supportByAnEPS}</span> </li>
                                    {dataForms.nameEPS && <li><span>Nom de l'EPS :</span> <span>{dataForms.nameEPS}</span> </li>}
                                    {dataForms.nameResponsable && <li><span>Nom du responsable :</span> <span>{dataForms.nameResponsable}</span> </li>}
                                    <li><span>Votre logement :</span> <span>{dataForms.housing}</span> </li>
                                    {dataForms.nameHousing && <li><span>Nom logement EPS :</span> <span>{dataForms.nameHousing}</span> </li>}
                                    {dataForms.nameResponsableHousing && <li><span>Nom du responsable de logement :</span> <span>{dataForms.nameResponsableHousing}</span> </li>}
                                    {dataForms.gsmEPSHousing && <li><span>Numéro du téléphone :</span> <span>{dataForms.gsmEPSHousing}</span> </li>}

                                </ul>
                            </div>

                        </div>

                        <div className="information-personnelle panel mb-5">
                            <h2 className='text-4xl md:text-lg mb-5'>Informations sur les parents</h2>
                            <div className="flex justify-around  ">


                                <ul className="list-disc">
                                    <li><span>Nombre total de frères et soeurs :</span> <span>{dataForms.TotalNumberOfSiblings}</span> </li>
                                    <li><span>Nombre de frères et soeurs mariés :</span> <span>{dataForms.NumberOfSiblingsMarried}</span> </li>
                                    <li><span>Nombre de frères et soeurs qui travaillent :</span> <span>{dataForms.NumberOfWorkingSiblings}</span> </li>

                                    {dataForms.workSituationFather && <li><span>Votre père travaille  :</span> <span>{dataForms.workSituationFather === 'trueF' ? 'Oui' : dataForms.workSituationFather === 'falseF' ? "Non" : "Retraité"}</span> </li>}
                                    {dataForms.situationBankFather && <li><span>Votre père a un compte bancaire :</span> <span>{dataForms.situationBankFather === "trueFB" ? "Oui" : "Non"}</span> </li>}
                                    {dataForms.fatherMonthlyAmount && <li><span>Revenu mensuel du père :</span> <span>{dataForms.fatherMonthlyAmount}</span> </li>}

                                    {/* {dataForms.handicapPercentage && <li><span>le pourcentage de votre handicap  :</span> <span>{dataForms.handicapPercentage}</span> </li>} */}



                                </ul>
                                <ul className="list-disc">
                                    {dataForms.functionFather && <li><span>Fonction du père  :</span> <span>{dataForms.functionFather}</span> </li>}
                                    {dataForms.functionMother && <li><span>Fonction de la mère  :</span> <span>{dataForms.functionMother}</span> </li>}
                                    {dataForms.fatherWorkPlace && <li><span>Lieu de travail du père  :</span> <span>{dataForms.motherMonthlyAmount}</span> </li>}
                                    {dataForms.motherWorkPlace && <li><span>Lieu de travail de la mère  :</span> <span>{dataForms.motherMonthlyAmount}</span> </li>}

                                    {dataForms.workSituationMother && <li><span>Votre mère travaille  :</span> <span>{dataForms.workSituationMother === 'trueM' ? 'Oui' : dataForms.workSituationMother === 'falseM' ? "Non" : "Retraité"}</span> </li>}
                                    {dataForms.situationBankMother && <li><span>Votre mère a un compte bancaire  :</span> <span>{dataForms.situationBankMother === 'trueMB' ? 'Oui' : 'Non'}</span> </li>}
                                    {dataForms.motherMonthlyAmount && <li><span>Revenu mensuel du mère  :</span> <span>{dataForms.motherMonthlyAmount}</span> </li>}


                                </ul>
                            </div>

                        </div>
                        <div className="information-personnelle panel mb-5">
                            <h2 className='text-4xl md:text-lg mb-5'>Informations culturelles</h2>
                            <div className="flex justify-around  ">


                                <ul className="list-disc">
                                    <li><span>Comment avez vous connu JADARA FOOUNDATION :</span> <span>{dataForms.fundationInfo}</span> </li>
                                </ul>
                                <ul className="list-disc">
                                    {dataForms.centersOfInterest && <li><span>Vos centres d'intérêt  :</span> <span>{dataForms.centersOfInterest}</span> </li>}

                                </ul>
                            </div>

                        </div>
                        <div className="information-personnelle panel mb-5">
                            <h2 className='text-4xl md:text-lg mb-5'>Pièces justificatives</h2>
                            <div className="flex justify-around  ">


                                <ul className="list-disc">{console.log('avatar', `/storage/` + dataForms.attestationRevenuMother)}
                                    {dataForms.attestationRevenuMother && <li><span>attestation de revenu de la mère  :</span> <span><a href={`/storage/` + dataForms.attestationRevenuMother} target="_blank" rel="noopener noreferrer">Voir</a></span> </li>}
                                    {dataForms.attestationRevenuFather && <li><span>attestation de revenu du père :</span> <span><a href={`/storage/` + dataForms.attestationRevenuFather} target="_blank">Voir</a></span> </li>}
                                    {dataForms.attestationRevenuMother && <li><span>attestation  bancaire du père  :</span> <span><a href={`/storage/` + dataForms.attestationBankFather} target="_blank" rel="noopener noreferrer">Voir</a></span> </li>}



                                </ul>
                                <ul className="list-disc">
                                    {dataForms.attestationBankMother && <li><span>attestation  bancaire de la mère :</span> <span><a href={`/storage/` + dataForms.attestationBankMother} target="_blank" rel="noopener noreferrer">Voir</a></span> </li>}
                                    {dataForms.certificatDeccesFather && <li><span>Certificat de décès du père  :</span> <span><a href={`/storage/` + dataForms.certificatDeccesFather} target="_blank" rel="noopener noreferrer">Voir</a></span> </li>}
                                    {dataForms.certificatDeccesMother && <li><span>Certificat de décès de la mère  :</span> <span><a href={`/storage/` + dataForms.certificatDeccesMother} target="_blank" rel="noopener noreferrer">Voir</a></span> </li>}


                                </ul>
                            </div>

                        </div>
                    </div>
                }

            </div>
        </DefaultLayout>
    )
}
export default ViewInscription