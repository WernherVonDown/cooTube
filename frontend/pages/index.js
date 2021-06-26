import A from "../components/common/A";
import CreateRoom from "../components/CreateRoom";
import Header from "../components/header";

const Index = () => {
    return (
        <div className="mainContainerWrapper">
            <CreateRoom />
        </div>
    )
}

export default Index;

// export async function getStaticProps(context) {
//     const res = await axios.get(`${config.serverAdress}/api/me`)
//     const data = res.data;

//     return {
//         props: { rooms: data || [] }, // will be passed to the page component as props
//     }
// }