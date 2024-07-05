import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  formatPhoneNumber,
  states,
  formatCreditCardNumber,
  formatExpirationDate,
} from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

const formSchema = z.object({
  "first-name": z.string(),
  "last-name": z.string(),
  email: z.string().email(),
  "phone-number": z
    .string()
    .min(12, { message: "Please enter a valid phone number" }),
  "address-home": z.string(),
  "address-state": z.string().min(2),
  "address-city": z.string(),
  "card-number": z.string().min(14, { message: "Please enter a card number" }),
  "address-zip": z.string().min(2),
  "card-expiration": z.string().min(5, { message: "Enter a valid date" }),
  "card-pin": z.string().min(3, { message: "Enter a card pin" }),
});

const ReservationForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="max-w-[700px] ">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>
              Fill out form to run check on avaliability to rent a car
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div id="contact-information">
                <p>Contact Information</p>
                <section
                  id="name"
                  className="border-2 rounded-md p-2 space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="first-name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last-name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone-number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <PhoneNumberInput
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>
              </div>
              <div id="address-information">
                <p>Address Information</p>
                <section
                  id="name"
                  className=" border-2 rounded-md p-2 space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="address-home"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Home Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address-state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {states.map((state, index) => (
                              <SelectItem
                                value={state.abbreviation}
                                key={index}
                              >
                                {state.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address-city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address-zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip</FormLabel>
                        <FormControl>
                          <ZipInput
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>
              </div>
              <div id="card-information">
                <p>Card Information</p>
                <section
                  id="name"
                  className=" border-2 rounded-md p-2 space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="card-number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number</FormLabel>
                        <FormControl>
                          <CardNumberInput
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="card-expiration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiration Date</FormLabel>
                        <FormControl>
                          <ExpirationInput
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="card-pin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pin</FormLabel>
                        <FormControl>
                          <PinInput
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Run Check</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default ReservationForm;

// ----- SPECIAL FORMATTED INPUTS ----- //

// @ts-ignore
const PhoneNumberInput = ({ value, onChange }) => {
  // Handle change and format the input value
  const handleChange = (event: { target: { value: string } }) => {
    const formattedValue = formatPhoneNumber(event.target.value);
    onChange(formattedValue); // Update the form value
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      placeholder="XXX-XXX-XXXX"
      maxLength={12} // Limit the input length to 11 characters (xx-xxx-xxxx)
    />
  );
};

// @ts-ignore
const ZipInput = ({ value, onChange }) => {
  // Handle change and format the input value
  const handleZipChange = (e: { target: { value: string } }) => {
    const newValue = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (newValue.length <= 5) {
      // Ensure max 5 digits
      onChange(newValue);
    }
  };
  return (
    <Input
      value={value}
      onChange={handleZipChange}
      maxLength={5} // Limit the input length to 11 characters (xx-xxx-xxxx)
    />
  );
};

// @ts-ignore
const PinInput = ({ value, onChange }) => {
  // Handle change and format the input value
  const handleZipChange = (e: { target: { value: string } }) => {
    const newValue = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (newValue.length <= 3) {
      // Ensure max 5 digits
      onChange(newValue);
    }
  };
  return (
    <Input
      value={value}
      onChange={handleZipChange}
      maxLength={5} // Limit the input length to 11 characters (xx-xxx-xxxx)
    />
  );
};

// @ts-ignore
const CardNumberInput = ({ value, onChange }) => {
  // Handle change and format the input value
  const handleChange = (event: { target: { value: string } }) => {
    const formattedValue = formatCreditCardNumber(event.target.value);
    onChange(formattedValue); // Update the form value
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      placeholder="XXXX-XXXX-XXXX"
      maxLength={14} // Limit the input length to 14 characters (xx-xxx-xxxx)
    />
  );
};

// @ts-ignore
const ExpirationInput = ({ value, onChange }) => {
  // Handle change and format the input value
  const handleChange = (event: { target: { value: string } }) => {
    const formattedValue = formatExpirationDate(event.target.value);
    onChange(formattedValue); // Update the form value
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      maxLength={5} // Limit the input length to 11 characters (xx-xxx-xxxx)
    />
  );
};
