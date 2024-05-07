import Summary from "./home/Summary";
import SummaryCard from "./home/SummaryCard"

const Home = () => {
    return(
        <>
            <h1>Home</h1>
            <div id = 'homeInfo'>
                <Summary/>
                <SummaryCard/>
            </div>
        </>
    )
}

export default Home;
