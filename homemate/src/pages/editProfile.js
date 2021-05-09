import React, { useState } from 'react';
import Navbar from '../components/navbar';
import EditRegister from '../components/form/editRegister';
import EditProfile from '../components/form/editProfile';
import { ENTER_PAGE_EDIT_PROFILE, ENTER_PAGE_EDIT_REGISTER } from '../utils/constants'; 


function EditProfilePage() {
    const options = [ENTER_PAGE_EDIT_PROFILE, ENTER_PAGE_EDIT_REGISTER];
    const [clickedOption, setClickedOption] = useState(ENTER_PAGE_EDIT_PROFILE);

    const onChangedEditProfile = () => {
        setClickedOption(ENTER_PAGE_EDIT_PROFILE);
    }

    const onChangedEditRegister = () => {
        setClickedOption(ENTER_PAGE_EDIT_REGISTER);
    }

    const contentForm = clickedOption === ENTER_PAGE_EDIT_PROFILE ? <EditProfile /> : <EditRegister/>;

    return (
        <>
            <Navbar choosed={clickedOption} actions={[onChangedEditProfile, onChangedEditRegister]}>
                {options}
            </Navbar>
            {contentForm}
        </>
    );
}

export default EditProfilePage;