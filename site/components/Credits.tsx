/** Credit line for every found picture (see public/images/credits.json). */
const credits = [
  { title: "Bangalore map 1878", by: "Government of India", licence: "public domain", licenceUrl: "https://creativecommons.org/publicdomain/mark/1.0/", page: "https://commons.wikimedia.org/wiki/File:Bangalore_map_1878.png" },
  { title: "Bangalore 1940", by: "Survey of India", licence: "public domain", licenceUrl: "https://creativecommons.org/publicdomain/mark/1.0/", page: "https://commons.wikimedia.org/wiki/File:Bangalore_1940.png" },
  { title: "Sarjapura 1429 CE Mayileya Nayaka’s Lunar Eclipse Inscription", by: "Shashikumara Naik K C", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Digital_Image_of_the_Sarjapura_1429CE_Mayileya_Nayaka%CA%BCs_Lunar_Eclipse_Inscription_03.png" },
  { title: "Rain tree avenue", by: "Shyamal L.", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Rain_tree_avenue.jpg" },
  { title: "Paddy field in Karnataka, India 2014", by: "Pramodv1993", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Paddy_field_in_Karnataka,_India_2014.jpg" },
  { title: "Plumeria rubra 2852", by: "Vengolis", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Plumeria_rubra_2852.jpg" },
  { title: "Aagara Lake, Bangalore (2025) 03", by: "Gpkp", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Aagara_Lake,_Bangalore_(2025)_03.webm" },
  { title: "Bangalore Lake island", by: "Underthesamesky", licence: "CC0", licenceUrl: "https://creativecommons.org/publicdomain/zero/1.0/", page: "https://commons.wikimedia.org/w/index.php?curid=167262152" },
];

export function Credits() {
  return (
    <p className="site-footer__legal">
      Pictures and footage of Bengaluru and Karnataka, via Wikimedia Commons:{" "}
      {credits.map((c, i) => (
        <span key={c.page}>
          <a href={c.page}>“{c.title}”</a> by {c.by}, <a href={c.licenceUrl}>{c.licence}</a>
          {i < credits.length - 1 ? "; " : "."}
        </span>
      ))}
    </p>
  );
}
