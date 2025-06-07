const sampleEmail = [
  "juan.delacruz@gmail.com",
  "maria.reyes@gmail.com",
  "jose.santos@gmail.com",
  "ana.ramos@gmail.com",
  "pedro.garcia@gmail.com",
  "liza.soberano@gmail.com",
  "kathryn.bernardo@gmail.com",
  "julia.bareto@gmail.com",
  "jose.rizal@gmail.com",
  "rico.alvarez@gmail.com",
  "karen.torres@gmail.com",
  "arnel.cruz@gmail.com",
  "celine.diaz@gmail.com",
  "marco.bautista@gmail.com",
  "joyce.navarro@gmail.com",
  "eric.lorenzo@gmail.com",
  "bea.salazar@gmail.com",
  "nathan.rosales@gmail.com",
  "camille.fernandez@gmail.com",
  "gilbert.morales@gmail.com",
  "trisha.monteverde@gmail.com",
  "miguel.rivera@gmail.com",
  "patricia.soriano@gmail.com",
];

export const getEmailSuggestions = (query) => {
  return new Promise((resolve) => {
    // apii huhu
    setTimeout(() => {
      const filteredEmails = sampleEmail.filter((email) =>
        email.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filteredEmails);
    }, 300);
  });
};
