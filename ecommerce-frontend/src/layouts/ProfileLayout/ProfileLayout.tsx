

const ProfileLayout: React.FC = () => {
    return (
        <div className="profile-layout">
            <header className="profile-header">
                <h1>Profile</h1>
            </header>
            <main className="profile-main">
                <section className="profile-info">
                    <h2>Personal Information</h2>
                    {/* Add profile info content here */}
                </section>
                <section className="profile-settings">
                    <h2>Settings</h2>
                    {/* Add profile settings content here */}
                </section>
            </main>
        </div>
    );
};

export default ProfileLayout;