import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';

const notification = () => {
  return (
    <div className='flex flex-col border-4 rounded-xl bg-white text-black bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200/90 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-50'>
      <button className='flex flex-col rounded-b p-2 transition ease-in-out delay-150 hover:-translate-y-0.5 hover:scale-90 hover: duration-200 ...'>
       <div className="flex flex-r"><p className="font-semibold"><MarkEmailUnreadIcon className=''/> Lia Ciobanu</p><p className="pl-2"><i>send you a notification </i></p></div> 
        <p><small className='p-0 text-zinc-600'>15 minutes ago</small></p>
      </button>
      {/* <div className="h-0.5 bg-[gray]/75"></div> */}
    </div>
  );
}

export default notification 