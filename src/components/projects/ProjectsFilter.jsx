import React, { useCallback, useEffect, useState } from 'react';

const filters = [
  { name: 'All' },
  { name: 'Featured' },
  { name: 'Private' },
  {
    name: 'Country',
    subfilters: [
      {
        name: 'Chile',
      },
      {
        name: 'Perú',
      },
      {
        name: 'Paraguay',
      },
    ],
  },
];

const ProjectsFilter = ({ projects, filteredProjects, setfilteredProjects }) => {
  const [selectFilter, setSelectFilter] = useState('Featured');
  const [subfilters, setSubfilters] = useState(null);
  const [selectSubfilter, setSelectSubfilter] = useState(null);

  const processFilters = useCallback(() => {
    const newFilteredProjects = projects.filter((project) => {
      if (selectFilter === 'All') {
        return project;
      } else if (selectFilter === 'Featured') {
        return project.isFeatured;
      } else if (selectFilter === 'Private') {
        return project.isPrivate;
      } else if (selectFilter === 'Country') {
        return project.company.country === selectSubfilter;
      }

      return null;
    });

    setfilteredProjects(newFilteredProjects);
  }, [projects, selectFilter, selectSubfilter, setfilteredProjects]);

  useEffect(() => {
    processFilters();
  }, [processFilters]);

  const handleFilterChange = (e) => {
    const selectFilter = e.currentTarget.value;
    setSelectFilter(selectFilter);

    setSubfilters(null);
    setSelectSubfilter(null);

    const findFilter = filters.find((filter) => {
      // console.log(filter.name, selectFilter);
      if (filter.name === selectFilter) {
        return filter;
      }

      return null;
    });

    if (findFilter && findFilter.subfilters) {
      setSubfilters(findFilter.subfilters);
      setSelectSubfilter(findFilter.subfilters[0].name);
    }

    processFilters();
  };

  const handleSubFilterChange = (e) => {
    const selectSubFilter = e.currentTarget.value;
    setSelectSubfilter(selectSubFilter);

    processFilters();
  };

  return (
    <div id='projects-filters'>
      <h3>
        Filters:{' '}
        <span>
          {filteredProjects.length} of {projects.length}
        </span>
      </h3>

      <div className='selects'>
        <select name='filter' value={selectFilter} onChange={(e) => handleFilterChange(e)}>
          {filters.map((filter) => {
            return (
              <option key={filter.name} value={filter.name}>
                {filter.name}
              </option>
            );
          })}
        </select>
        {subfilters && (
          <select name='select' value={selectSubfilter} onChange={(e) => handleSubFilterChange(e)}>
            {subfilters.map((subfilter) => {
              return (
                <option key={subfilter.name} value={subfilter.name}>
                  {subfilter.name}
                </option>
              );
            })}
          </select>
        )}
      </div>
    </div>
  );
};

export default ProjectsFilter;
