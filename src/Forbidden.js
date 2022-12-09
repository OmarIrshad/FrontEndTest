import NavBar from "./components/universal/NavBar";
/**
 * react component for the forbidden page
 * redirected to in the event of unauthorized access
 * @function
 * @author @AakashHaran
 */
const Forbidden = () => {
    return (
        <>
            <NavBar navItems={[]} home={"/"} />
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }}>
                <h1 class="display-1">It looks like you don't have access to that page!</h1>
            </div>
        </>
    );
}

export default Forbidden;