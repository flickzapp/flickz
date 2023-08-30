export default function WaitlistPage() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h1 className="text-8xl font-extrabold mt-20 text-center tracking-tighter">
        flickz is coming soon!
      </h1>
      <p className="text-2xl font-bold mt-10 text-center tracking-tighter">
        {"you've been added to the waitlist! We'll notify when we launch"}
      </p>
      <div className="w-full md:w-1/2">
        <video className="w-full" autoPlay loop muted src="/final-dark.webm" />
      </div>
    </div>
  );
}
