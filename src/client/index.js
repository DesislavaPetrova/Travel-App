import { addTripInfo } from './js/addTripInfo';
import { deleteTripInfo } from './js/deleteTripInfo';
import { listCountry } from './js/listCountry';

import './styles/main.scss';

// Event Listener to Submit button
document.getElementById('save').addEventListener('click', addTripInfo);

export {
    addTripInfo,
    deleteTripInfo,
    listCountry
};