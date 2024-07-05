import { ThemeToggleBtn } from "./themeToggleBtn";
import { Button } from "@/components/ui/button";
import { TriangleAlertIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CloudUploadIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const Footer = () => {
  return (
    <footer className="bg-card flex justify-center text-foreground">
      <section className="max-w-[800px] flex flex-col items-center py-2 gap-2">
        <div className="space-x-4">
          <ThemeToggleBtn />

          {/* dialog start  */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <TriangleAlertIcon className="h-5 w-5 mr-2" />
                report issue
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Report Issue</DialogTitle>
                <DialogDescription>
                  If you're encountering an issue, please report it below.
                </DialogDescription>
              </DialogHeader>
              <Textarea />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">
                    <CloudUploadIcon className="h-5 w-5 mr-2" />
                    Send Error
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* dialog end */}
        </div>
        © 2024, App.com, Inc. or its affiliates
      </section>
    </footer>
  );
};

export default Footer;
