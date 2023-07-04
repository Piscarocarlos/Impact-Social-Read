import React, { useState } from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import { DataTable } from "mantine-datatable";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../store/themeConfigSlice";
import { Link, useForm, usePage } from "@inertiajs/inertia-react";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";
import { encodeID } from "../../keys/Index";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { MdEdit, MdDelete } from "react-icons/md";
import { Inertia } from "@inertiajs/inertia";
import { FaEdit, FaTrashAlt, FaSave } from "react-icons/fa"; // Import the necessary icons
import { ToastContainer, toast } from "react-toastify";


const CurrencySetting = ({ currency, defaultCurrency }) => {
    let defaultValue = null;


    for (let i = 0; i < defaultCurrency.length; i++) {
      if (defaultCurrency[i].type === 'defaultCurrency') {
        defaultValue = defaultCurrency[i].value;
        break;
      }
    }
    
    console.log(defaultValue);


    const formatRow = defaultCurrency.find((row) => row.type === "format");
    const formatValue = formatRow ? formatRow.value : null;

    const separatorRow = defaultCurrency.find(
        (row) => row.type === "separator"
    );
    const separatorValue = separatorRow ? separatorRow.value : null;

    const decimalPlacesRow = defaultCurrency.find(
        (row) => row.type === "decimalPlaces"
    );
    const decimalPlacesValue = decimalPlacesRow ? decimalPlacesRow.value : null;

    const defaultCurrencyRow = defaultCurrency.find(
        (row) => row.type === "defaultCurrency"
    );
    const defaultCurrencyValue = defaultCurrencyRow
        ? defaultCurrencyRow.value
        : null;

    const useFormValues = useForm({
        defaultCurrency: "",
        format: "",
        separator: "",
        decimalPlaces: decimalPlacesValue,
        newCurrencyName: "",
        newCurrencyCode: "",
        newCurrencySymbol: "",
        newCurrencyExchangeRate: "",
        currencies: currency,
        showNewCurrencyModal: false,
    });

    const { data, setData, errors, post } = useFormValues;

    const [editingCurrencyId, setEditingCurrencyId] = useState(null);
    const [modifiedName, setModifiedName] = useState("");
    const [modifiedCode, setModifiedCode] = useState("");
    const [modifiedSymbol, setModifiedSymbol] = useState("");
    const [modifiedExchangeRate, setModifiedExchangeRate] = useState("");

    const handleDataChange = (key, value) => {
        setData(key, value);
    };

    const handleDefaultCurrencyChange = (event) => {
        handleDataChange("defaultCurrency", event.target.value);
    };

    const handleFormatChange = (event) => {
        handleDataChange("format", event.target.value);
    };

    const handleSeparatorChange = (event) => {
        handleDataChange("separator", event.target.value);
    };

    const handleDecimalPlacesChange = (event) => {
        handleDataChange("decimalPlaces", Number(event.target.value));
    };

    const handleNewCurrencyNameChange = (event) => {
        handleDataChange("newCurrencyName", event.target.value);
    };

    const handleNewCurrencyCodeChange = (event) => {
        handleDataChange("newCurrencyCode", event.target.value);
    };

    const handleNewCurrencySymbolChange = (event) => {
        handleDataChange("newCurrencySymbol", event.target.value);
    };

    const handleNewCurrencyExchangeRateChange = (event) => {
        handleDataChange("newCurrencyExchangeRate", event.target.value);
    };

    const handleSuccess = (response) => {
        // Handle success
    };

    const handleError = (errors) => {
        // Handle errors
    };

    const [defaultCurrencyError, setDefaultCurrencyError] = useState("");
    const [formatError, setFormatError] = useState("");
    const [separatorError, setSeparatorError] = useState("");
    const [decimalPlacesError, setDecimalPlacesError] = useState("");
    const [newCurrencyNameError, setNewCurrencyNameError] = useState("");
    const [newCurrencyCodeError, setNewCurrencyCodeError] = useState("");
    const [newCurrencySymbolError, setNewCurrencySymbolError] = useState("");
    const [newCurrencyExchangeRateError, setNewCurrencyExchangeRateError] =
        useState("");
    const [deleteCurrencyErrorMessage, setDeleteCurrencyErrorMessage] =
        useState("");

    const handleAddCurrency = async (e) => {
        e.preventDefault();

        if (data.newCurrencyName === "") {
            setNewCurrencyNameError("Veuillez entrer le nom de la devise");
            return;
        }

        if (data.newCurrencyCode === "") {
            setNewCurrencyCodeError("Veuillez entrer le code de la devise");
            return;
        }

        if (data.newCurrencySymbol === "") {
            setNewCurrencySymbolError(
                "Veuillez entrer le symbole de la devise"
            );
            return;
        }

        if (data.newCurrencyExchangeRate === "") {
            setNewCurrencyExchangeRateError(
                "Veuillez entrer le taux de change"
            );
            return;
        }

        const newCurrency = {
            name: data.newCurrencyName,
            code: data.newCurrencyCode,
            symbol: data.newCurrencySymbol,
            exchange_rate: data.newCurrencyExchangeRate,
        };


        setData("currencies", [...data.currencies, newCurrency]);
        setData("newCurrencyName", "");
        setData("newCurrencyCode", "");
        setData("newCurrencySymbol", "");
        setData("newCurrencyExchangeRate", "");
        setData("showNewCurrencyModal", false);

        post(route("dashboard.save.currency"), {
            data,
            onError: handleError,
            onSuccess: handleSuccess,
        });

        location.reload();
    };

    const handleSaveDefaultCurrency = () => {
        if (data.defaultCurrency === "") {
            setDefaultCurrencyError("Cette devise est déjà choisie");
            return;
        }

        post(route("dashboard.save.default.currency"), {
            data,
            onError: handleError,
            onSuccess: handleSuccess,
        });

        location.reload();
    };

    const handleSaveFormat = () => {
        if (data.format === "") {
            setFormatError("Sélectionner un nouveau format");
            return;
        }

        if (data.separator === "") {
            setSeparatorError("Sélectionner un nouveau séparateur");
            return;
        }

        if (data.decimalPlaces === "") {
            setDecimalPlacesError("Veuillez entrer le nombre de décimales");
            return;
        }

        post(route("dashboard.save.format.settings"), {
            data,
            onError: handleError,
            onSuccess: handleSuccess,
        });
        location.reload();
    };

    const handleDeleteCurrency = (id) => {
        const foundCurrency = currency.find((element) => element.id === id);
        console.log(foundCurrency.code);
            console.log(defaultValue);

        if (foundCurrency.code === defaultValue) {
           

            
            setShowDeleteErrorModal(true);
        } else {
            post(route("dashboard.delete.currency", id));
            location.reload();
        }
    };

    const handleEditCurrency = (id) => {
        const { name, code, symbol, exchange_rate } = data.currencies[id];
        setEditingCurrencyId(id);
        setModifiedName(name);
        setModifiedCode(code);
        setModifiedSymbol(symbol);
        setModifiedExchangeRate(exchange_rate);
    };

    const handleSaveModifiedCurrency = (e) => {
        const currencyId = data.currencies[editingCurrencyId].id;

        const formData = {
            id: currencyId,
            name: modifiedName,
            code: modifiedCode,
            symbol: modifiedSymbol,
            exchange_rate: modifiedExchangeRate,
        };

        e.preventDefault();

        post(route("dashboard.save.modified.currency", formData));

        setEditingCurrencyId(null);
        setModifiedName("");
        setModifiedCode("");
        setModifiedSymbol("");
        setModifiedExchangeRate("");

        location.reload();
    };
    const handleDismissDeleteErrorModal = () => {
        setShowDeleteErrorModal(false);
    };

    const [showDeleteErrorModal, setShowDeleteErrorModal] = useState(false);

    return (
        <DefaultLayout>
            <div className="grid grid-cols-2 gap-4">
                <div className="panel">
                    <p className="text-xl pb-3 flex items-center border-b-2 pb-2 mb-4">
                        Devise par défaut
                    </p>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="defaultCurrency" className="block">
                                Sélectionnez la devise par défaut:
                            </label>
                            <select
                                id="defaultCurrency"
                                value={data.defaultCurrency}
                                onChange={handleDefaultCurrencyChange}
                                className="form-select mt-1 block w-full"
                            >
                                <option value="">

                                Devise Actuelle: { defaultCurrency[0]?.defaultCurrency}
                                </option>
                                {data.currencies.map((currency, index) => (
                                    <option key={index} value={currency.code}>
                                        {currency.name} ({currency.symbol})
                                    </option>
                                ))}
                            </select>
                            {defaultCurrencyError && (
                                <p
                                    className={`text-red-500 text-sm ${
                                        defaultCurrencyError
                                            ? "inertia-error"
                                            : ""
                                    }`}
                                >
                                    {defaultCurrencyError}
                                </p>
                            )}
                        </div>
                        <div className="mt-7">
                            <button
                                onClick={handleSaveDefaultCurrency}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </div>

                <div className="panel">
                    <p className="text-xl pb-3 flex items-center border-b-2 pb-2 mb-4">
                        Définition du format
                    </p>
                    <div className="flex space-x-4">
                        <div className="w-1/3">
                            <label htmlFor="format" className="block">
                                Format:
                            </label>
                            <select
                                id="format"
                                value={data.format}
                                onChange={handleFormatChange}
                                className="form-select mt-1 block w-full"
                            >

                                <option value="">{defaultCurrency[0]?.format}</option>

                                <option value="[Symbole] [Nombre]">
                                    Symbole en premier avec espace
                                </option>
                                <option value="[Symbole][Nombre]">
                                    Symbole en premier sans espace
                                </option>
                                <option value="[Nombre] [Symbole]">
                                    Nombre en premier avec espace
                                </option>
                                <option value="[Nombre][Symbole]">
                                    Nombre en premier sans espace
                                </option>
                            </select>
                            {formatError && (
                                <p
                                    className={`text-red-500 text-sm ${
                                        formatError ? "inertia-error" : ""
                                    }`}
                                >
                                    {formatError}
                                </p>
                            )}
                        </div>
                        <div className="w-1/3">
                            <label htmlFor="separator" className="block">
                                Séparateur:
                            </label>
                            <select
                                id="separator"
                                value={data.separator}
                                onChange={handleSeparatorChange}
                                className="form-select mt-1 block w-full"
                            >
                                <option value="">

                                1{defaultCurrency[0]?.separator}000{defaultCurrency[0]?.separator}000

                                </option>
                                <option value=",">Virgule (,)</option>
                                <option value=".">Point décimal (.)</option>
                            </select>
                            {separatorError && (
                                <p
                                    className={`text-red-500 text-sm ${
                                        separatorError ? "inertia-error" : ""
                                    }`}
                                >
                                    {separatorError}
                                </p>
                            )}
                        </div>
                        <div className="w-1/3">
                            <label htmlFor="decimalPlaces" className="block">
                                Décimales:
                            </label>
                            <input
                                id="decimalPlaces"
                                type="number"
                                value={data.decimalPlaces}
                                onChange={handleDecimalPlacesChange}
                                className="form-input mt-1 block w-full"
                            />
                            {decimalPlacesError && (
                                <p
                                    className={`text-red-500 text-sm ${
                                        decimalPlacesError
                                            ? "inertia-error"
                                            : ""
                                    }`}
                                >
                                    {decimalPlacesError}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            onClick={handleSaveFormat}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Enregistrer
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <div className="mt-4">
                    <button
                        onClick={() =>
                            setData(
                                "showNewCurrencyModal",
                                !data.showNewCurrencyModal
                            )
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        style={{ lineHeight: "1.5" }}
                    >
                        Ajouter une devise
                    </button>
                </div>

                {data.showNewCurrencyModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="w-1/3 bg-white p-8 rounded-lg animate-fade-in dark:bg-dark">
                            <p className="text-xl pb-3 flex items-center border-b-2 pb-2 mb-4">
                                Ajouter une devise
                            </p>
                            <form onSubmit={handleAddCurrency}>
                                <div className="space-y-4">
                                    <label
                                        htmlFor="newCurrencyName"
                                        className="block"
                                    >
                                        Nom de la devise:
                                    </label>
                                    <input
                                        id="newCurrencyName"
                                        type="text"
                                        value={data.newCurrencyName}
                                        onChange={handleNewCurrencyNameChange}
                                        className="form-input w-full"
                                    />
                                    {newCurrencyNameError && (
                                        <p
                                            className={`text-red-500 text-sm ${
                                                newCurrencyNameError
                                                    ? "inertia-error"
                                                    : ""
                                            }`}
                                        >
                                            {newCurrencyNameError}
                                        </p>
                                    )}
                                    <label
                                        htmlFor="newCurrencyCode"
                                        className="block"
                                    >
                                        Code de la devise:
                                    </label>
                                    <input
                                        id="newCurrencyCode"
                                        type="text"
                                        value={data.newCurrencyCode}
                                        onChange={handleNewCurrencyCodeChange}
                                        className="form-input w-full"
                                    />
                                    {newCurrencyCodeError && (
                                        <p
                                            className={`text-red-500 text-sm ${
                                                newCurrencyCodeError
                                                    ? "inertia-error"
                                                    : ""
                                            }`}
                                        >
                                            {newCurrencyCodeError}
                                        </p>
                                    )}
                                    <label
                                        htmlFor="newCurrencySymbol"
                                        className="block"
                                    >
                                        Symbole de la devise:
                                    </label>
                                    <input
                                        id="newCurrencySymbol"
                                        type="text"
                                        value={data.newCurrencySymbol}
                                        onChange={handleNewCurrencySymbolChange}
                                        className="form-input w-full"
                                    />
                                    {newCurrencySymbolError && (
                                        <p
                                            className={`text-red-500 text-sm ${
                                                newCurrencySymbolError
                                                    ? "inertia-error"
                                                    : ""
                                            }`}
                                        >
                                            {newCurrencySymbolError}
                                        </p>
                                    )}
                                    <label
                                        htmlFor="newCurrencyExchangeRate"
                                        className="block"
                                    >
                                        Taux de change:
                                    </label>
                                    <input
                                        id="newCurrencyExchangeRate"
                                        type="text"
                                        value={data.newCurrencyExchangeRate}
                                        onChange={
                                            handleNewCurrencyExchangeRateChange
                                        }
                                        className="form-input w-full"
                                    />
                                    {newCurrencyExchangeRateError && (
                                        <p
                                            className={`text-red-500 text-sm ${
                                                newCurrencyExchangeRateError
                                                    ? "inertia-error"
                                                    : ""
                                            }`}
                                        >
                                            {newCurrencyExchangeRateError}
                                        </p>
                                    )}
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Ajouter
                                    </button>
                                    <button
                                        onClick={() =>
                                            setData(
                                                "showNewCurrencyModal",
                                                false
                                            )
                                        }
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-4"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <br />

            <div className="panel">
                <p className="text-xl pb-3 flex items-center border-b-2 pb-2 mb-4">
                    Liste des devises
                </p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        // Handle form submission if needed
                    }}
                >
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Code</th>
                                <th>Symbole</th>
                                <th>Taux de change (MAD)</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.currencies.map((currency, id) => (
                                <tr key={id}>
                                    <td>
                                        {editingCurrencyId === id ? (
                                            <input
                                                type="text"
                                                value={modifiedName}
                                                onChange={(e) =>
                                                    setModifiedName(
                                                        e.target.value
                                                    )
                                                }
                                                className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        ) : (
                                            currency.name
                                        )}
                                    </td>
                                    <td>
                                        {editingCurrencyId === id ? (
                                            <input
                                                type="text"
                                                value={modifiedCode}
                                                onChange={(e) =>
                                                    setModifiedCode(
                                                        e.target.value
                                                    )
                                                }
                                                className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        ) : (
                                            currency.code
                                        )}
                                    </td>
                                    <td>
                                        {editingCurrencyId === id ? (
                                            <input
                                                type="text"
                                                value={modifiedSymbol}
                                                onChange={(e) =>
                                                    setModifiedSymbol(
                                                        e.target.value
                                                    )
                                                }
                                                className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        ) : (
                                            currency.symbol
                                        )}
                                    </td>
                                    <td>
                                        {editingCurrencyId === id ? (
                                            <input
                                                type="text"
                                                value={modifiedExchangeRate}
                                                onChange={(e) =>
                                                    setModifiedExchangeRate(
                                                        e.target.value
                                                    )
                                                }
                                                className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        ) : (
                                            currency.exchange_rate
                                        )}
                                    </td>
                                    <td>
                                        {editingCurrencyId === id ? (
                                            <button
                                                onClick={
                                                    handleSaveModifiedCurrency
                                                }
                                                className="text-green-500 hover:text-green-600"
                                            >
                                                <FaSave />{" "}
                                                {/* Use the save icon */}
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        handleEditCurrency(id)
                                                    }
                                                    className="text-blue-500 hover:text-blue-600"
                                                >
                                                    <FaEdit />{" "}
                                                    {/* Use the edit icon */}
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteCurrency(
                                                            currency.id
                                                        )
                                                    }
                                                    className="text-red-500 hover:text-red-600 ml-2"
                                                >
                                                    <FaTrashAlt />{" "}
                                                    {/* Use the delete icon */}
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>

                {showDeleteErrorModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="w-1/3 bg-white p-8 rounded-lg animate-fade-in dark:bg-dark">
                            <p className="text-xl pb-3 flex items-center border-b-2 pb-2 mb-4">
                                Avertissement
                            </p>
                            <p>
                                Vous ne pouvez pas supprimer la devise par
                                défaut actuellement choisie.
                            </p>
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={handleDismissDeleteErrorModal}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};

export default CurrencySetting;
