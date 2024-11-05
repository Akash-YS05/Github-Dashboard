import { useRepositories } from "../../hooks/useRepositories";
import Header from "./Header";
import PRChart from "./PRChart";
import RepoList from "./RepoList";

const Dashboard = () => {
    const org = localStorage.getItem('orgName');
    const {data} = useRepositories(org)

    return (
        <div className="max-w-4xl mx-auto p-4">
          <Header />
          <div className="grid gap-6 mt-6">
            <RepoList repos={data} />
            <div className="grid grid-cols-2 gap-6">
              {/* <PRChart repos={data}/> */}
              {/* <IssueStats /> */}
            </div>
          </div>
        </div>
      );
}

export default Dashboard