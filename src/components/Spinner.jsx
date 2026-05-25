import { FadeLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto 50px auto",
};

const Spinner = ({ color = "blue" }) => {
  return (
    <div>
      <FadeLoader
        color={color}
        cssOverride={override}
        aria-label="Loading"
      />
    </div>
  );
};

export default Spinner;