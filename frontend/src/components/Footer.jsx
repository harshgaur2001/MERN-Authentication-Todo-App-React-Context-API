export default function Footer() {
  return (
    <footer className="bg-gray-200 text-center p-3 mt-10">
      <p className="text-sm">
        © {new Date().getFullYear()} Todo App by Harsh Gaur. All rights
        reserved.
      </p>
    </footer>
  );
}
