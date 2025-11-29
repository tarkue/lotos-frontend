import { cn } from "@/src/shared/libs/utils";
import { Container } from "@/src/shared/ui/container";
import { Link } from "@/src/shared/ui/link";
import { FOOTER_LINKS } from "./models/footer-links";

export const Footer = () => {
  return (
    <footer
      className={cn(
        "w-full bg-none px-4 sm:px-0 py-3 bg-white border-base-200 border-t"
      )}
    >
      <Container className={cn("justify-end")}>
        <ul className="flex flex-col gap-2">
          {FOOTER_LINKS.map((el, i) => (
            <li key={i} className="flex items-end">
              <Link href={el.href} className="text-right w-full text-black">
                {el.title}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
};
