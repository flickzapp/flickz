import { ThemeToggle } from "@/components/theme-toggle";
const SiteFooter = () => {
  return (
    <footer className="container">
      Hello world
      <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm leading-5 text-gray-500">
            © {new Date().getFullYear()} Flickz.app. All rights reserved.
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
