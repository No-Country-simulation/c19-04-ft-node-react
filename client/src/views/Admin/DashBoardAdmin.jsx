import RegisterUser from '../../components/Register/Register';

const DashBoardAdmins = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='space-y-10'>
        <h1 className='text-5xl font-thin text-center'>Registrate</h1>
        <RegisterUser />
      </div>
    </div>
  );
};

export default DashBoardAdmins;
