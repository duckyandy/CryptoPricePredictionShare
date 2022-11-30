function Header() {
  return (
    <header className="flex h-30 w-full bg-gradient-to-r from-white to-[#fad991] border-2 border-gray">
      <div>
        <img width="80" height="80" src="/cryptoHeaderIcon.png" />
      </div>
      <div className="items-center flex pl-20 space-x-10">
        <h1 className="text-[#62c7de] font-bold text-xl">
          Price Prediction Gambling.
        </h1>
        <h2 className="text-[#6469e3] font-semibold">Test your foresight!</h2>
      </div>
    </header>
  );
}

export default Header;
