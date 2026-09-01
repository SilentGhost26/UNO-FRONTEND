import '../css/profile.view.css';

export const renderProfile = () => {
    return `
        <section id="profile-screen">
            <div id="profile-card">
                <h1 class="title">PROFILE</h1>
                <form id="profile-form">
                    <label for="profile-email">Email</label>
                    <input id="profile-email" type="email" readonly />

                    <label for="profile-name">Name</label>
                    <input id="profile-name" name="name" type="text" minlength="3" maxlength="20" readonly required />

                    <label for="profile-age">Age</label>
                    <input id="profile-age" name="age" type="number" min="5" max="100" readonly required />

                    <p id="profile-message" class="hidden"></p>
                    <div id="profile-read-actions">
                        <button type="button" id="profile-return-btn">Return</button>
                        <button type="button" id="profile-edit-btn">Edit</button>
                    </div>
                    <div id="profile-edit-actions" class="hidden">
                        <button type="button" id="profile-cancel-btn">Cancel</button>
                        <button type="submit" id="profile-save-btn">Save</button>
                    </div>
                </form>
            </div>
        </section>
    `;
};
