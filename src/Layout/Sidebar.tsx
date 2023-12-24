//Components
import Profile from "@/Components/Sidebar/Profile";
import Navs from "@/Components/Sidebar/Navs";

//Interface
interface Props {
    active?: string;
}
const Sidebar = ({ active }: Props) => {
    return (
        <div className="shadow-3xl border border-solid border-gray-200 rounded-md overflow-hidden">
            <Profile />
            <Navs active={active} />
        </div>
    );
};

export default Sidebar;