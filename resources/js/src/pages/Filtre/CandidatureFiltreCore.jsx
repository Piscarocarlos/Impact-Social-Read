import React, { useState , useEffect } from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import { usePage } from "@inertiajs/inertia-react";
import { useRef } from "react";
import { saveAs } from "file-saver";


function CandidatureFiltreCore({ tableData, decodedArray, setParentFilteredArray }) {
    //const { tableData } = usePage().props;


    //const { decodedArray } = usePage().props;

    const variableNames = Object.keys(decodedArray[0]).filter(
        (key) => typeof decodedArray[0][key] !== "function"
    );

    const availableColumns = variableNames;

    const selectedColumns = variableNames.slice(0, 5);

    const [shownColumns, setShownColumns] = useState(selectedColumns);

    const handleColumnToggle = (column) => {
        if (shownColumns.includes(column)) {
            setShownColumns(shownColumns.filter((col) => col !== column));
        } else {
            if (shownColumns.length < 10) {
                const updatedColumns = [...shownColumns, column];
                setShownColumns(
                    availableColumns.filter((col) =>
                        updatedColumns.includes(col)
                    )
                );
            } else {
                console.log(
                    "Maximum number of columns reached. You can only select up to 10 columns."
                );
            }
        }
    };

    const toggleColumn = (column) => {
        if (shownColumns.includes(column)) {
            setShownColumns(shownColumns.filter((col) => col !== column));
        } else {
            if (shownColumns.length < 10) {
                const updatedColumns = [...shownColumns, column];
                setShownColumns(
                    availableColumns.filter((col) =>
                        updatedColumns.includes(col)
                    )
                );
            } else {
                console.log(
                    "Maximum number of columns reached. You can only select up to 10 columns."
                );
            }
        }
    };

    //
    const filtersData = [];

    const regionOptions = tableData.RegionData;
    const provinceOptions = tableData.ProvinceData;
    const cityOptions = tableData.CityData;
    const socialSituationOptions = tableData.SituationData;
    const handicapSituationOptions = tableData.SituationHandicapData;
    const supportByAnEPSOptions = tableData.EpsSupportData;
    const housingOptions = tableData.HousingData;
    const orphelinTypeOptions = tableData.OrphelinData;
    const parentalCareOptions = tableData.ParentalCareData;
    const handicapTypeOptions = tableData.HandicapTypeData;
    const handicapPercentageOptions = tableData.HandicapPercentageData;
    const workSituationFatherOptions = tableData.WorkSituationFatherData;
    const workSituationMotherOptions = tableData.WorkSituationMotherData;
    const situationBankFatherOptions = tableData.SituationBankFatherData;
    const situationBankMotherOptions = tableData.SituationBankMotherData;
    const yearBacOptions = tableData.YearBacData;
    const schoolNameOptions = tableData.SchoolNameData;
    const bacStreamOptions = tableData.BacStreamData;
    const foundationInfoOptions = tableData.FundationInfoData;
    const genreOptions = tableData.GenreData;

    const [menuOpen, setMenuOpen] = useState(false);

    const filterOptions = [
        { name: "Région", slug: "region", options: regionOptions },
        { name: "Province", slug: "province", options: provinceOptions },
        { name: "Ville", slug: "city", options: cityOptions },
        {
            name: "Situation sociale",
            slug: "socialSituation",
            options: socialSituationOptions,
        },
        {
            name: "Situation d'handicap",
            slug: "handicapSituation",
            options: handicapSituationOptions,
        },
        {
            name: "Prise en charge par un EPS",
            slug: "supportByAnEPS",
            options: supportByAnEPSOptions,
        },
        { name: "Logement", slug: "housing", options: housingOptions },
        {
            name: "Orphelin",
            slug: "orphelinType",
            options: orphelinTypeOptions,
        },
        {
            name: "Prise en charge par le parent",
            slug: "parentalCare",
            options: parentalCareOptions,
        },
        {
            name: "Type d'handicap",
            slug: "handicapType",
            options: handicapTypeOptions,
        },
        {
            name: "Le pourcentage de votre handicap",
            slug: "handicapPercentage",
            options: handicapPercentageOptions,
        },
        {
            name: "Votre père travaille",
            slug: "workSituationFather",
            options: workSituationFatherOptions,
        },
        {
            name: "Votre mère travaille",
            slug: "workSituationMother",
            options: workSituationMotherOptions,
        },
        {
            name: "Compte bancaire du père",
            slug: "situationBankFather",
            options: situationBankFatherOptions,
        },
        {
            name: "Compte bancaire de la mère",
            slug: "situationBankMother",
            options: situationBankMotherOptions,
        },
        { name: "Année du Bac", slug: "yearBac", options: yearBacOptions },
        {
            name: "Nom du lycée",
            slug: "schoolName",
            options: schoolNameOptions,
        },
        {
            name: "Filière du Bac",
            slug: "bacStream",
            options: bacStreamOptions,
        },
        {
            name: "Comment vous avez connu JADARA",
            slug: "fundationInfo",
            options: foundationInfoOptions,
        },
        { name: "Genre", slug: "genre", options: genreOptions },
    ];

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filterValues, setFilterValues] = useState({});

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const [filteredArray, setFilteredArray] = useState(decodedArray);

    const handleFilterSelect = (filterSlug) => {
        if (selectedFilters.includes(filterSlug)) {
            setSelectedFilters(selectedFilters.filter((f) => f !== filterSlug));
            setFilterValues((prevFilterValues) => {
                const { [filterSlug]: removedValue, ...newFilterValues } =
                    prevFilterValues;
                return newFilterValues;
            });
        } else {
            setSelectedFilters([...selectedFilters, filterSlug]);
        }

    };

    const handleFilterValueChange = (filterSlug, value) => {
        setFilterValues((prevFilterValues) => ({
            ...prevFilterValues,
            [filterSlug]: value,
        }));
    };
    let filteredData = [];

    const handleSubmit = () => {
        const filteredData = decodedArray.filter((item) => {
            for (const filter of selectedFilters) {
                const filterValue = filterValues[filter];
                if (filterValue && item[filter] !== filterValue) {
                    return false;
                }
            }
            return true;
        });
        setFilteredArray(filteredData);
        setParentFilteredArray(filteredData);
        closeModal();
    };

    const exportData = () => {
        const format = exportFormatRef.current.value;
        // Perform export logic based on the selected format
        const jsonBlob = new Blob([JSON.stringify(filteredArray)], {
            type: "application/json",
        });

        saveAs(jsonBlob, "filteredData.json");
        // ...
    };
    //console.log("filteredData", filteredArray);

    const exportFormatRef = useRef();



    useEffect(() => {
        setParentFilteredArray(filteredArray);
      }, [filteredArray, setParentFilteredArray]);
    

    return (
        <div>
            <h2 className="ltr:mr-1 rtl:ml- font-bold text-xl  mb-4">
                {" "}
                Selection des bénéficiaires par filtre{" "}
            </h2>
            <div className="panel">
                <div className="p-4 mb-4 flex justify-between items-center">
                    <button
                        onClick={openModal}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Définir de nouveaux filtres{" "}
                    </button>

                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white w-1/2 p-6 rounded shadow-lg">
                                <h2 className="text-xl font-bold mb-4">
                                    Filtres
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Fermer
                                </button>

                                <div className="my-4">
                                    <label className="block mb-2 font-bold">
                                        Sélectionnez les filtres :
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {filterOptions.map((filter) => (
                                            <button
                                                key={filter.slug}
                                                onClick={() =>
                                                    handleFilterSelect(
                                                        filter.slug
                                                    )
                                                }
                                                className={`border rounded py-2 px-3 ${
                                                    selectedFilters.includes(
                                                        filter.slug
                                                    )
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-gray-200 text-gray-800"
                                                }`}
                                            >
                                                {filter.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 max-h-60 overflow-y-auto">
                                    {selectedFilters.map((filter) => (
                                        <div
                                            key={filter}
                                            className="my-4 flex-1"
                                        >
                                            <label
                                                htmlFor={filter}
                                                className="block mb-2 font-bold"
                                                style={{
                                                    width: `${
                                                        filterOptions.find(
                                                            (option) =>
                                                                option.slug ===
                                                                filter
                                                        ).name.length * 8
                                                    }px`,
                                                }}
                                            >
                                                {
                                                    filterOptions.find(
                                                        (option) =>
                                                            option.slug ===
                                                            filter
                                                    ).name
                                                }
                                                :
                                            </label>
                                            <select
                                                id={filter}
                                                className="border rounded py-2 px-3 w-full"
                                                value={
                                                    filterValues[filter] || ""
                                                }
                                                onChange={(e) =>
                                                    handleFilterValueChange(
                                                        filter,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Sélectionnez une option
                                                </option>
                                                {filterOptions
                                                    .find(
                                                        (option) =>
                                                            option.slug ===
                                                            filter
                                                    )
                                                    .options.map((option) => (
                                                        <option
                                                            key={option}
                                                            value={option}
                                                        >
                                                            {option}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Soumettre
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="relative">
                        <div className="flex items-center">
                            <button
                                className="bg-gray-700 text-gray-200 rounded-full px-3 py-2"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                Colonnes &nbsp;
                                {menuOpen ? "▲" : "▼"}
                            </button>
                        </div>
                        {menuOpen && (
                            <div className="absolute top-full right-0 mt-2 bg-gray-800 text-gray-200 max-h-60 overflow-y-auto shadow-lg rounded-md scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
                                <div className="p-2">
                                    {availableColumns.map((column) => (
                                        <label
                                            key={column}
                                            className="flex items-center my-2"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={shownColumns.includes(
                                                    column
                                                )}
                                                onChange={() =>
                                                    handleColumnToggle(column)
                                                }
                                                className="form-checkbox mr-2 h-4 w-4 text-blue-500"
                                            />
                                            <span className="text-sm">
                                                {column}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <table className="table-hover table-striped">
                    <thead>
                        <tr>
                            {shownColumns.map((column) => (
                                <th key={column} className="px-4 py-2">
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredArray.map((item, index) => (
                            <tr key={index}>
                                {shownColumns.map((column) => (
                                    <td key={column} className="px-4 py-2">
                                        {item[column]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                    <label htmlFor="exportFormat" className="mr-2 font-bold">
                        Export Format:
                    </label>
                    <select
                        id="exportFormat"
                        className="border rounded py-2 px-3"
                        ref={exportFormatRef}
                    >
                        <option value="json">JSON</option>
                        {/* Add more options for different export formats */}
                    </select>
                </div>
                <button
                    onClick={exportData}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
                >
                    Export
                </button>
            </div>
        </div>
    );
}

export default CandidatureFiltreCore;
