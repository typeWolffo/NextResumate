import { withSession } from "@/HOC";

function Settings() {
  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
}

export default Settings;

export const getServerSideProps = withSession();
