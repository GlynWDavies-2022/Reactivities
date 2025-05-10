namespace Application.Core;

using AutoMapper;
using Domain;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<Activity,Activity>().ReverseMap();
    }
}
