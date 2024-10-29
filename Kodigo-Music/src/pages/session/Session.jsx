import Login from "./components/Login";
import SignUp from "./components/SignUp";

function Session({ type, clearTypeForm, setNewTypeForm }) {

    let content;
    function changeTypeForm(newType) {
        setNewTypeForm(newType);
    };

    switch (type) {
        case 'login':
            content = <Login clearTypeForm={clearTypeForm} changeTypeForm={changeTypeForm} />
            break;
        case 'register':
            content = <SignUp clearTypeForm={clearTypeForm} changeTypeForm={changeTypeForm} />
            break;
        default:
            content = '';
            break;
    }
    return (
        <>
            {content}
        </>
    );
}
export default Session;