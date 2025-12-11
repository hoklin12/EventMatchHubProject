interface SelectableSkillsProps {
  availableSkills: string[];
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
}

export function SelectableSkills({
  availableSkills,
  selectedSkills,
  onChange,
}: SelectableSkillsProps) {
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onChange(selectedSkills.filter((s) => s !== skill));
    } else {
      onChange([...selectedSkills, skill]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 relative z-0">
      {availableSkills.map((skill) => {
        const isSelected = selectedSkills.includes(skill);

        return (
          <button
            key={skill}
            type="button"
            onClick={() => toggleSkill(skill)}
            className={`px-4 py-2 rounded-lg text-sm border transition 
              ${
                isSelected
                  ? "bg-black text-white border-black"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }
            `}
          >
            {skill}
          </button>
        );
      })}
    </div>
  );
}
