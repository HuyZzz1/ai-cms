import { TailSpin } from "react-loader-spinner";

const LoaderComponent = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#F5F5F5]">
      <TailSpin
        height="80"
        width="80"
        color="#007bff"
        ariaLabel="tail-spin-loading"
        radius="1"
        visible={true}
      />
      <p className="mt-4 text-lg text-gray-600 font-medium">
        Đang tải dữ liệu...
      </p>
    </div>
  );
};

export default LoaderComponent;
