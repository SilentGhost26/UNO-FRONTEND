import { renderProfile } from '../views/profile.view';
import { getProfile, updateProfile } from '../services/player.service';
import { getToken } from '../utils/storage';
import navigate from '../router/router';

export const profileController = {
    render: renderProfile,
    mount: async () => {
        if (!getToken()) {
            navigate('/login');
            return;
        }

        const form = document.querySelector('#profile-form');
        const email = document.querySelector('#profile-email');
        const name = document.querySelector('#profile-name');
        const age = document.querySelector('#profile-age');
        const message = document.querySelector('#profile-message');
        const readActions = document.querySelector('#profile-read-actions');
        const editActions = document.querySelector('#profile-edit-actions');
        const cancelBtn = document.querySelector('#profile-cancel-btn');
        const saveBtn = document.querySelector('#profile-save-btn');
        const returnBtn = document.querySelector('#profile-return-btn');
        const editBtn = document.querySelector('#profile-edit-btn');
        let originalProfile;

        const showMessage = (text) => {
            message.textContent = text;
            message.classList.remove('hidden');
        };

        const setReadOnly = (readOnly) => {
            name.readOnly = readOnly;
            age.readOnly = readOnly;
            readActions.classList.toggle('hidden', !readOnly);
            editActions.classList.toggle('hidden', readOnly);
            if (!readOnly) {
                message.classList.add('hidden');
            }
        };

        const displayProfile = (profile) => {
            email.value = profile.email;
            name.value = profile.name;
            age.value = profile.age;
        };

        const profile = await getProfile();
        if (!profile.ok) {
            showMessage(profile.error?.message || 'Could not load profile');
            return;
        }
        originalProfile = profile.result;
        displayProfile(originalProfile);
        setReadOnly(true);

        returnBtn.addEventListener('click', () => navigate('/lobby'));
        editBtn.addEventListener('click', () => {
            setReadOnly(false);
            readActions.classList.add('hidden');
        });
        cancelBtn.addEventListener('click', () => {
            displayProfile(originalProfile);
            setReadOnly(true);
            readActions.classList.remove('hidden');
        });

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const result = await updateProfile({ name: name.value, age: Number(age.value) });
            if (!result.ok) {
                showMessage(result.error?.message || 'Could not update profile');
                return;
            }

            originalProfile = result.result;
            displayProfile(originalProfile);
            setReadOnly(true);
        });
    },
};
