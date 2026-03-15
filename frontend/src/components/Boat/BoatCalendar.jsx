import React, { useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import { French } from 'flatpickr/dist/l10n/fr.js';

// Import du style de base et d'un thème sombre adapté à votre UI
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';

const BoatCalendar = ({ startDate, endDate, onDateChange }) => {
    const calendarRef = useRef(null);
    const flatpickrInstance = useRef(null);

    useEffect(() => {
        if (calendarRef.current) {
            // Initialisation de Flatpickr
            flatpickrInstance.current = flatpickr(calendarRef.current, {
                mode: "range",
                inline: true,
                minDate: "today",
                dateFormat: "Y-m-d",
                locale: French,
                defaultDate: startDate && endDate ? [startDate, endDate] : null,
                onChange: (selectedDates) => {
                    // On attend que les deux dates (départ et retour) soient sélectionnées
                    if (selectedDates.length === 2) {
                        // Formatage pour éviter les problèmes de fuseau horaire
                        const start = selectedDates[0].toLocaleDateString('en-CA');
                        const end = selectedDates[1].toLocaleDateString('en-CA');
                        onDateChange(start, end);
                    }
                }
            });
        }

        // Nettoyage de l'instance lors du démontage du composant
        return () => {
            if (flatpickrInstance.current) {
                flatpickrInstance.current.destroy();
            }
        };
    }, []); // Exécuté une seule fois au montage

    // Écoute des changements depuis les filtres (ex: clic sur "Réinitialiser" ou "Effacer")
    useEffect(() => {
        if (!startDate && !endDate && flatpickrInstance.current) {
            flatpickrInstance.current.clear();
        }
    }, [startDate, endDate]);

    return (
        <div className="flex flex-col items-center flatpickr-custom-wrapper">
            <div ref={calendarRef}></div>
            {/* Le bouton "Effacer la sélection" est géré par Boats.jsx via onDateChange */}
        </div>
    );
};

export default BoatCalendar;